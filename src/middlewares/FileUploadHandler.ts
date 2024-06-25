import multer from "multer";
import floor from "lodash/floor";

export default (fields: { name: string; type: "image" | "pdf" }[]) =>
  multer({
    fileFilter: (request, file, callback) => {
      const fileSize = parseInt(request.headers["content-length"] ?? "");

      if (file.mimetype.includes("image") && floor(fileSize / 1024 / 1024, 2) > 1) {
        return callback(new Error("Image size can not be bigger than 1mb"));
      }

      const field = fields.find((f) => f.name === file.fieldname || file.fieldname.indexOf(f.name) > -1);

      if (!field || file.mimetype === "application/json") {
        callback(null, true);
      } else {
        const allowedMimetypes = {
          image: ["image/jpeg", "image/png", "image/webp"],
          pdf: ["application/pdf"],
        }[field.type];

        const isValidType = (allowedMimetypes || []).some((type) => type === file.mimetype);

        callback(null, isValidType);
      }
    },
  }).any();
