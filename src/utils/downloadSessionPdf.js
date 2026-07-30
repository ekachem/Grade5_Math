import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

const topicNames = {
  algebra: "Algebra",
  fractions: "Fractions",
};

const difficultyNames = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function createSafeFileName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function downloadSessionPdf(session) {
  if (!session) {
    throw new Error("No completed practice session was provided.");
  }

  const document = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const topic = topicNames[session.topic] ?? session.topic;
  const difficulty =
    difficultyNames[session.difficulty] ?? session.difficulty;

  const percentage = Math.round(
    (session.score / session.totalQuestions) * 100
  );

  const generatedDate = new Date();

  /*
   * PDF title
   */
  document.setFont("helvetica", "bold");
  document.setFontSize(20);
  document.text("Grade 5 Mathematics", 14, 18);

  document.setFontSize(15);
  document.text("Practice Session Results", 14, 27);

  /*
   * Session information
   */
  document.setFont("helvetica", "normal");
  document.setFontSize(10);

  document.text(
    `Generated: ${generatedDate.toLocaleString()}`,
    14,
    36
  );

  document.text(`Topic: ${topic}`, 14, 43);
  document.text(`Difficulty: ${difficulty}`, 14, 49);
  document.text(
    `Score: ${session.score} out of ${session.totalQuestions}`,
    14,
    55
  );
  document.text(`Percentage: ${percentage}%`, 14, 61);

  /*
   * Answer-review table
   */
  const rows = session.results.map((result, index) => [
    String(index + 1),
    result.prompt,
    result.submittedAnswer,
    result.correctAnswer,
    result.correct ? "Correct" : "Incorrect",
  ]);

  autoTable(document, {
    startY: 69,

    head: [
      [
        "No.",
        "Question",
        "Student answer",
        "Correct answer",
        "Result",
      ],
    ],

    body: rows,

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 2.5,
      overflow: "linebreak",
      valign: "middle",
    },

    headStyles: {
      fontStyle: "bold",
      halign: "center",
    },

    columnStyles: {
      0: {
        cellWidth: 12,
        halign: "center",
      },
      1: {
        cellWidth: 55,
      },
      2: {
        cellWidth: 38,
      },
      3: {
        cellWidth: 38,
      },
      4: {
        cellWidth: 30,
        halign: "center",
      },
    },

    margin: {
      top: 15,
      right: 14,
      bottom: 18,
      left: 14,
    },

    didParseCell(data) {
      if (data.section !== "body" || data.column.index !== 4) {
        return;
      }

      const result = String(data.cell.raw);

      if (result === "Correct") {
        data.cell.styles.textColor = [22, 101, 52];
        data.cell.styles.fillColor = [240, 253, 244];
        data.cell.styles.fontStyle = "bold";
      } else {
        data.cell.styles.textColor = [153, 27, 27];
        data.cell.styles.fillColor = [254, 242, 242];
        data.cell.styles.fontStyle = "bold";
      }
    },

    didDrawPage() {
      const pageNumber = document.getNumberOfPages();
      const pageHeight = document.internal.pageSize.getHeight();

      document.setFont("helvetica", "normal");
      document.setFontSize(8);

      document.text(
        `Grade 5 Mathematics - Page ${pageNumber}`,
        14,
        pageHeight - 8
      );
    },
  });

  const dateForFileName = generatedDate
    .toISOString()
    .slice(0, 10);

  const fileName = [
    "grade5-math",
    createSafeFileName(topic),
    createSafeFileName(difficulty),
    dateForFileName,
  ].join("_");

  document.save(`${fileName}.pdf`);
}
