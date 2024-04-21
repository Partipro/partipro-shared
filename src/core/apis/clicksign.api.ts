import axios, { Method } from "axios";

export type SignerData = {
  email: string;
  name: string;
  phone: string;
};

async function buildRequest<D>({
  method,
  url,
  data,
  contentType = "application/vnd.api+json",
}: {
  method: Method;
  url: string;
  data: D;
  contentType?: string;
}) {
  const response = await axios({
    method,
    headers: {
      "Content-Type": contentType,
    },
    url: `https://sandbox.clicksign.com/${url}?access_token=${process.env.CLICKSIGN_ACCESS_TOKEN}`,
    data: {
      data,
    },
  });
  return response.data;
}

async function addDocument({
  envelopeId,
  fileBuffer,
  fileName,
}: {
  fileBuffer: Buffer;
  envelopeId: string;
  fileName: string;
}) {
  const pdfData = Buffer.from(fileBuffer).toString("base64");
  return buildRequest({
    method: "POST",
    url: `api/v3/envelopes/${envelopeId}/documents`,
    data: {
      type: "documents",
      attributes: {
        filename: fileName,
        content_base64: `data:application/pdf;base64,${pdfData}`,
      },
    },
  });
}

async function addSigner({ signerEmail, envelopeId }: { signerEmail: string; envelopeId: string }) {
  return buildRequest({
    method: "POST",
    url: `api/v3/envelopes/${envelopeId}/signers`,
    data: {
      type: "signers",
      attributes: {
        email: signerEmail,
        has_documentation: false,
        communicate_events: {
          document_signed: "email",
          signature_request: "email",
          signature_reminder: "email",
        },
      },
    },
  });
}

async function addRequirements({
  envelopeId,
  signerId,
  documentId,
}: {
  envelopeId: string;
  signerId: string;
  documentId: string;
}) {
  const relationships = {
    document: {
      data: { type: "documents", id: documentId },
    },
    signer: {
      data: { type: "signers", id: signerId },
    },
  };
  await Promise.all([
    buildRequest({
      method: "POST",
      url: `api/v3/envelopes/${envelopeId}/requirements`,
      data: {
        type: "requirements",
        attributes: {
          action: "agree",
          role: "lessee",
        },
        relationships,
      },
    }),
    buildRequest({
      method: "POST",
      url: `api/v3/envelopes/${envelopeId}/requirements`,
      data: {
        type: "requirements",
        attributes: {
          action: "provide_evidence",
          auth: "facial_biometrics",
        },
        relationships,
      },
    }),
    buildRequest({
      method: "POST",
      url: `api/v3/envelopes/${envelopeId}/requirements`,
      data: {
        type: "requirements",
        attributes: {
          action: "rubricate",
          pages: "all",
        },
        relationships,
      },
    }),
  ]);
}

class ClicksignEnvelopeApi {
  constructor() {}

  async createEnvelope({ name, fileBuffer, signerEmail }: { name: string; fileBuffer: Buffer; signerEmail: string }) {
    const envelopeResponse = await buildRequest({
      method: "post",
      url: "api/v3/envelopes",
      data: {
        type: "envelopes",
        attributes: {
          name,
        },
      },
    });
    const documentResponse = await addDocument({ fileBuffer, fileName: name, envelopeId: envelopeResponse?.data.id });
    const signerResponse = await addSigner({ envelopeId: envelopeResponse?.data.id, signerEmail });

    await addRequirements({
      envelopeId: envelopeResponse?.data.id,
      signerId: signerResponse?.data.id,
      documentId: documentResponse?.data.id,
    });

    return { envelopeId: envelopeResponse?.data.id, signerId: signerResponse?.data.id };
  }
}

class ClicksingNotificationApi {
  constructor() {}

  async createNotification({ envelopeId, signerId }: { envelopeId: string; signerId: string }) {
    return buildRequest({
      method: "POST",
      url: `api/v3/envelopes/${envelopeId}/signers/${signerId}/notifications`,
      data: {
        type: "notifications",
        attributes: {
          message:
            "Olá, este é o contrato de locator para locatário que você precisa assinar. Clique no link abaixo para assinar. Obrigado!",
        },
      },
    });
  }
}

const clicksignEnvelopApi = new ClicksignEnvelopeApi();
const clicksignNotificationApi = new ClicksingNotificationApi();

export { clicksignEnvelopApi, clicksignNotificationApi };
