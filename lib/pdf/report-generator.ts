import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { format } from "date-fns";

import {
    Assessment,
    Recommendation,
} from "@/types/assessment";



const PAGE_WIDTH = 210;
const PAGE_MARGIN = 15;


const PRIMARY: [number, number, number] = [
    16,
    185,
    129,
];


const DARK: [number, number, number] = [
    31,
    41,
    55,
];


const LIGHT: [number, number, number] = [
    100,
    116,
    139,
];


const BORDER: [number, number, number] = [
    226,
    232,
    240,
];



interface ReportStudent {

    full_name: string;

    student_id: string;

    university: string;

    department: string;

    semester: string;

}



function loadImage(
    src: string
): Promise<string> {


    return fetch(src)

        .then(res => {

            if (!res.ok) {

                throw new Error(
                    "Image not found"
                );

            }


            return res.blob();

        })

        .then(blob => {


            return new Promise(
                resolve => {


                    const reader =
                        new FileReader();



                    reader.onloadend = () => {


                        resolve(
                            reader.result as string
                        );


                    };



                    reader.readAsDataURL(
                        blob
                    );


                }
            );


        });


}




function addTitle(
    pdf: jsPDF,
    text: string,
    y: number,
    size = 13
) {


    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        size
    );


    pdf.setTextColor(
        ...DARK
    );


    pdf.text(
        text,
        PAGE_MARGIN,
        y
    );


}




function formatDate(
    date: string
) {

    return format(
        new Date(date),
        "dd MMM yyyy"
    );

}





export async function generateAssessmentReport(
    assessment: Assessment,
    student: ReportStudent
) {


    const pdf =
        new jsPDF({

            orientation: "portrait",

            unit: "mm",

            format: "a4",

        });



    let y = 15;



    /*
    ===================================
    HEADER
    ===================================
    */


    let logo: string | null = null;


    try {

        logo =
            await loadImage(
                "/bubt-logo.png"
            );

    }
    catch {

        console.log(
            "Logo missing"
        );

    }



    pdf.setFillColor(
        248,
        250,
        252
    );


    pdf.rect(
        0,
        0,
        PAGE_WIDTH,
        38,
        "F"
    );



    if (logo) {

        pdf.addImage(
            logo,
            "PNG",
            PAGE_MARGIN,
            7,
            20,
            20
        );

    }



    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        14
    );


    pdf.setTextColor(
        ...DARK
    );



    pdf.text(
        "Bangladesh University of Business & Technology",
        42,
        12
    );



    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        9
    );



    pdf.text(
        "Department of Computer Science & Engineering",
        42,
        18
    );



    pdf.setFont(
        "helvetica",
        "bold"
    );


    pdf.setFontSize(
        12
    );


    pdf.setTextColor(
        ...PRIMARY
    );


    pdf.text(
        "PsycoMentalHub",
        42,
        27
    );



    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        8
    );


    pdf.setTextColor(
        ...LIGHT
    );



    pdf.text(
        "AI Mental Wellness Assessment Report",
        42,
        33
    );



    y = 48;




    /*
    ===================================
    TITLE
    ===================================
    */


    addTitle(
        pdf,
        "Student Wellness Summary Report",
        y,
        16
    );


    y += 7;


    pdf.setFontSize(
        9
    );


    pdf.setTextColor(
        ...LIGHT
    );


    pdf.text(
        "AI-assisted wellness evaluation for student self-awareness.",
        PAGE_MARGIN,
        y
    );



    y += 10;



    /*
    ===================================
    STUDENT INFO
    ===================================
    */


    addTitle(
        pdf,
        "Student Information",
        y
    );


    y += 5;



    autoTable(
        pdf,
        {

            startY: y,


            body: [

                [
                    "Name",
                    student.full_name
                ],

                [
                    "Student ID",
                    student.student_id
                ],

                [
                    "Department",
                    student.department
                ],

                [
                    "Semester",
                    student.semester
                ],

                [
                    "University",
                    student.university
                ],

            ],



            theme: "grid",


            styles: {

                fontSize: 8,

                cellPadding: 3

            },


            columnStyles: {

                0: {
                    cellWidth: 35,
                    fontStyle: "bold"
                },

                1: {
                    cellWidth: 120
                }

            }


        }
    );



    y =
        (pdf as any)
            .lastAutoTable
            .finalY + 8;



    /*
    ===================================
    ASSESSMENT SCORE
    ===================================
    */


    addTitle(
        pdf,
        "Assessment Overview",
        y
    );


    y += 5;



    autoTable(
        pdf,
        {

            startY: y,


            head: [

                [
                    "Score",
                    "Mental State",
                    "Confidence"
                ]

            ],


            body: [

                [
                    `${assessment.score}/100`,
                    assessment.mental_state,
                    `${assessment.confidence}%`
                ]

            ],


            theme: "grid",


            headStyles: {

                fillColor: PRIMARY,

                textColor: 255,

                halign: "center"

            },


            styles: {

                fontSize: 9,

                cellPadding: 4

            }

        }

    );



    y =
        (pdf as any)
            .lastAutoTable
            .finalY + 8;
    /*
    ===================================
    AI SUMMARY
    ===================================
    */


    addTitle(
        pdf,
        "AI Wellness Summary",
        y
    );


    y += 6;



    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        9
    );


    pdf.setTextColor(
        ...DARK
    );



    const summary =
        (
            assessment.ai_summary ??
            "No AI summary available."
        )
            .substring(
                0,
                320
            );



    const summaryLines =
        pdf.splitTextToSize(
            summary,
            PAGE_WIDTH -
            PAGE_MARGIN * 2
        );



    pdf.text(
        summaryLines,
        PAGE_MARGIN,
        y
    );



    y +=
        summaryLines.length * 4 +
        8;




    /*
    ===================================
    KEY INSIGHTS
    ===================================
    */


    addTitle(
        pdf,
        "Wellness Insights",
        y
    );


    y += 5;



    if (
        assessment.ai_analysis
    ) {


        autoTable(
            pdf,
            {


                startY: y,


                head: [

                    [
                        "Area",
                        "Level"
                    ]

                ],



                body: [


                    [
                        "Stress",
                        assessment.ai_analysis.stress.level
                    ],


                    [
                        "Anxiety",
                        assessment.ai_analysis.anxiety.level
                    ],


                    [
                        "Sleep",
                        assessment.ai_analysis.sleep.level
                    ],


                    [
                        "Focus",
                        assessment.ai_analysis.focus.level
                    ],


                ],



                theme: "grid",



                headStyles: {

                    fillColor:
                        PRIMARY,

                    textColor:
                        255,

                    halign:
                        "center"

                },



                styles: {

                    fontSize:
                        8,

                    cellPadding:
                        3

                },



                columnStyles: {

                    0: {
                        cellWidth: 70
                    },

                    1: {
                        cellWidth: 70,
                        halign: "center"
                    }

                }



            }

        );



        y =
            (pdf as any)
                .lastAutoTable
                .finalY + 8;


    }




    /*
    ===================================
    RECOMMENDATIONS
    ===================================
    */


    addTitle(
        pdf,
        "Recommended Wellness Actions",
        y
    );



    y += 6;



    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        9
    );



    if (
        assessment.recommendations.length === 0
    ) {


        pdf.text(
            "No recommendations available.",
            PAGE_MARGIN,
            y
        );


    }

    else {


        assessment.recommendations
            .slice(0, 3)
            .forEach(

                (
                    item: Recommendation,
                    index: number
                ) => {


                    const text =
                        `${index + 1}. ${item.title}`;



                    pdf.text(
                        text,
                        PAGE_MARGIN,
                        y
                    );



                    y += 5;



                }

            );


    }





    /*
    ===================================
    DISCLAIMER
    ===================================
    */


    y += 5;



    pdf.setDrawColor(
        ...BORDER
    );



    pdf.line(
        PAGE_MARGIN,
        y,
        PAGE_WIDTH - PAGE_MARGIN,
        y
    );



    y += 8;



    pdf.setFont(
        "helvetica",
        "italic"
    );



    pdf.setFontSize(
        7
    );



    pdf.setTextColor(
        ...LIGHT
    );



    const disclaimer =

        "This AI-generated report is intended for educational and self-awareness purposes only. It does not represent a medical diagnosis.";



    const disclaimerLines =
        pdf.splitTextToSize(
            disclaimer,
            PAGE_WIDTH -
            PAGE_MARGIN * 2
        );



    pdf.text(
        disclaimerLines,
        PAGE_MARGIN,
        y
    );





    /*
    ===================================
    FOOTER
    ===================================
    */


    pdf.setFont(
        "helvetica",
        "normal"
    );


    pdf.setFontSize(
        8
    );



    pdf.setTextColor(
        ...LIGHT
    );



    pdf.text(
        "PsycoMentalHub | BUBT Student Wellness Report",
        PAGE_MARGIN,
        288
    );



    pdf.text(
        format(
            new Date(),
            "dd MMM yyyy"
        ),
        PAGE_WIDTH - PAGE_MARGIN,
        288,
        {
            align: "right"
        }
    );





    /*
    ===================================
    SAVE
    ===================================
    */


    pdf.save(
        `PsycoMentalHub_Report_${assessment.id}.pdf`
    );


}