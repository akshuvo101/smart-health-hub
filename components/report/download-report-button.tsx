"use client";

import { useState } from "react";

import {
    Download,
    Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { Assessment } from "@/types/assessment";

import {
    generateAssessmentReport,
} from "@/lib/pdf/report-generator";


interface DownloadReportButtonProps {

    assessment: Assessment;

}



interface StudentProfile {

    full_name: string;

    student_id: string;

    university: string;

    department: string;

    semester: string;

}



export default function DownloadReportButton({
    assessment,
}: DownloadReportButtonProps) {


    const [loading, setLoading] =
        useState(false);



    const handleDownload = async () => {


        try {


            setLoading(true);



            /**
             * Fetch Student Profile
             */

            const response =
                await fetch(
                    "/api/profile"
                );



            const result =
                await response.json();



            if (!result.success) {

                throw new Error(
                    "Unable to load student profile"
                );

            }



            const profile:
                StudentProfile =
            {

                full_name:
                    result.data.full_name
                    ||
                    "Student Name",


                student_id:
                    result.data.student_id
                    ||
                    "N/A",


                university:
                    result.data.university
                    ||
                    "Bangladesh University of Business & Technology",


                department:
                    result.data.department
                    ||
                    "Computer Science & Engineering",


                semester:
                    result.data.semester
                    ||
                    "N/A",

            };





            /**
             * Generate PDF
             */


            await generateAssessmentReport(
                assessment,
                profile
            );



            toast.success(
                "Report generated successfully"
            );



        }

        catch(error){


            console.error(
                "Failed to generate PDF:",
                error
            );



            toast.error(
                "Failed to generate report. Please try again."
            );


        }


        finally {


            setLoading(false);


        }


    };





    return (

        <button

            type="button"

            onClick={handleDownload}

            disabled={loading}


            className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-emerald-500
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition

                hover:bg-emerald-600

                disabled:cursor-not-allowed
                disabled:opacity-70
            "

        >

            {
                loading ?

                (
                    <>

                        <Loader2
                            className="
                                h-4
                                w-4
                                animate-spin
                            "
                        />

                        Generating...

                    </>

                )

                :

                (

                    <>

                        <Download
                            className="
                                h-4
                                w-4
                            "
                        />

                        Download PDF

                    </>

                )

            }


        </button>

    );

}