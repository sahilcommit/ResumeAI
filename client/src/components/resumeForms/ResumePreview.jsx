import ModernTemplate from "../../assets/templates/ModernTemplate";
import MinimalImageTemplate from "../../assets/templates/MinimalImageTemplate";
import MinimalTemplate from "../../assets/templates/MinimalTemplate";
import ClassicTemplate from "../../assets/templates/ClassicTemplate";
import MinimalistTemplate from "../../assets/templates/MinimalistTemplate";
import CreativeVisualTemplate from "../../assets/templates/CreativeVisualTemplate";
import CorporateATSTemplate from "../../assets/templates/CorporateATSTemplate";
import ModernProTemplate from "../../assets/templates/ModernProTemplate";
import MinimalATSTemplate from "../../assets/templates/MinimalATSTemplate";

const ResumePreview = ({
  data,
  template,
  accentColor,
  fontFamily,
  classes = "",
}) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;

      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;

      case "minimalist":
        return <MinimalistTemplate data={data} accentColor={accentColor} />;

      case "creativeVisual":
        return <CreativeVisualTemplate data={data} accentColor={accentColor} />;

      case "corporateATSTemplate":
        return <CorporateATSTemplate data={data} accentColor={accentColor} />;

      case "modernProTemplate":
        return <ModernProTemplate data={data} accentColor={accentColor} />;

      case "minimalATSTemplate":
        return <MinimalATSTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="flex w-full justify-center rounded-2xl border border-slate-200 bg-slate-100 p-3 sm:p-5">
      <div
        id="resume-preview"
        className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${classes}`}
        style={{ fontFamily: fontFamily || data.font_family || "Arial, sans-serif" }}
      >
        {renderTemplate()}
      </div>

      <style>{`
        @page {
          size: letter;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }

          /* hide everything except resume */
          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;
