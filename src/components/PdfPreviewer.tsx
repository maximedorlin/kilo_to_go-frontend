// import Image from "next/image";
import React, { useEffect, useState } from "react";
import ErrorComponent from "./dashboard/ErrorComponent";
import { useTranslation } from "react-i18next";
import { useLazyFetchFileQuery } from "@/store/apis/fetchFile";

const PdfPreview: React.FC<{ path: string }> = ({ path }) => {
  const b = path.split("/");
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL_SIMPLE}`;
  const { t } = useTranslation();
  if (b.length > 3) {
    for (let i = 3; i < b.length; i++) {
      const element = b[i];
      url += element + "/";
    }
  }

  const [getFile, { data: fileBlob, error, isLoading }] =
    useLazyFetchFileQuery();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Create the blob URL when the file is fetched
  useEffect(() => {
    if (fileBlob) {
      const url = URL.createObjectURL(fileBlob);
      setPdfUrl(url);
      // Clean up the URL when the component is unmounted
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [fileBlob]);

  useEffect(() => {
    if (path.endsWith(".pdf")) {
      getFile(url);
    }
  }, [url, getFile, path]);
  if (isLoading) return <div> {t("loading")} </div>;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div>
      {pdfUrl && fileBlob?.type === "application/pdf" ? (
        <iframe
          src={`${pdfUrl}`}
          // #toolbar=0&navpanes=0&scrollbar=0
          width="100%"
          height="900px"
          title="PDF Preview"
          style={{ border: "none", margin: 0, padding: 0, outline: "none" }}
        />
      ) : (
        <div>
          {/* <Image width={200} height={200} src={path} alt="images_ts" /> */}
        </div>
      )}
    </div>
  );
};

export default PdfPreview;
