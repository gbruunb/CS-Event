"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react"
import { useState } from "react";

import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import registerSchema from "@/pages/api/validations/registerSchema";


export default function Home() {

    

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = (data: FieldValues) => {
        console.log("dfdf");
        alert("Form Submitted");
        
        console.log("FORM",data);
    };



    const { data: session } = useSession()

    //var
    const [prefix, setPrefix] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [profilePhoto, setProfilePhoto] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [emailGoogle, setEmailGoogle] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [studentID, setStudentID] = useState<number>(0);
    const [year, setYear] = useState<any>("");



    const [isSameEmail, setIsSameEmail] = useState<boolean>(false);


    //dynamic form
    const handleIsSameEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSameEmail(e.target.checked);
    };

    const handleStudentRole = (e: any) => {
        setRole(e.target.value);
    }

    const handleStudentID = (e: React.ChangeEvent<HTMLInputElement>) => {
        const studentIDString: string = e.target.value;
        const yearEntry: number = parseInt(studentIDString.substring(0, 2));

        const monthNow: number = new Date().getMonth() + 1;
        const yearNowBC: number = monthNow >= 6 ? new Date().getFullYear() + 543 : new Date().getFullYear() + 542;
        const yearNowBCString: string = yearNowBC.toString().substring(2, 4);
        setYear(parseInt(yearNowBCString) - yearEntry + 1);
    }



    if (session && session.user) {
        return (
            <div className="m-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-semibold leading-7 text-gray-900 text-xl text-center">ลงทะเบียนผู้ใช้</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                                ข้อมูลการลงทะเบียนผู้ใช้ จะนำไปใช้ในการจัดการกิจกรรม และการจัด Short Course
                            </p>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-semibold leading-7 text-gray-900 text-xl">ข้อมูลส่วนตัว</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                กรอกข้อมูลให้ครบถ้วน
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-1">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        คำนำหน้า
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>เลือกคำนำหน้า</option>
                                            <option>นาย</option>
                                            <option>นางสาว</option>
                                            <option>นาง</option>
                                            <option>ดร.</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        ชื่อจริง
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="firstname"
                                            autoComplete="given-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            {...register("firstname")}
                                        />
                                    </div>
                                    {
                                        errors?.firstname && (<p className="text-sm text-red-500">{`${errors?.firstname.message}`}</p>)
                                    }
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        นามสกุล
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        ชื่อเล่น
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        รูปโปรไฟล์
                                        <p className="text-gray-400 font-light">เป็นรูปประจำตัวหรือรูปอย่างอื่นก็ได้</p>
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>อัปโหลดรูปภาพ</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">หรือลากรูปภาพมาวางที่นี่ จำนวน 1 รูป</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">ไฟล์ที่รองรับ : PNG, JPG, JPEG, GIF</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="sm:col-span-1">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        ตำแหน่ง
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleStudentRole}
                                        >
                                            <option>เลือกตำแหน่ง</option>
                                            <option value="student">นักศึกษา</option>
                                            <option value="teacher">อาจารย์</option>
                                            <option value="graduate">บัณฑิต</option>
                                            <option value="general">บุคคลทั่วไป</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        ที่อยู่อีเมลที่เชื่อมต่อบัญชี Google
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled
                                            type="email"
                                            value={session.user.email || ''}
                                            name="emailGoogle"
                                            id="emailGoogle"
                                            autoComplete="emailGoogle"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        ที่อยู่อีเมลที่ติดต่อได้
                                    </label>
                                    <div className="mt-2">
                                        <input type="checkbox" name="" id="" onChange={handleIsSameEmail} />
                                        <label htmlFor="day-count" className="ml-3 text-sm font-medium leading-6 text-gray-900">
                                            เป็นอีเมลเดียวกัน
                                        </label>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        ที่อยู่อีเมลที่ติดต่อได้
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled={isSameEmail}
                                            type="email"
                                            value={isSameEmail ? session.user.email || '' : ''}
                                            name="emailGoogle"
                                            id="emailGoogle"
                                            autoComplete="emailGoogle"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                                <div className="sm:col-span-2">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        ช่องทางการติดต่อ
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="contact"
                                            id="contact"
                                            autoComplete="contact"
                                            placeholder="เช่น FB : Unnameboy GBru"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                {/* {role === "student" && ( */}
                                <>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                            รหัสนักศึกษา
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="contact"
                                                id="contact"
                                                autoComplete="contact"
                                                placeholder="99999999"
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={handleStudentID}
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                            ชั้นปี
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled
                                                type="number"
                                                name="contact"
                                                id="contact"
                                                autoComplete="contact"
                                                value={year}
                                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </>

                                {/* )} */}



                            </div>
                        </div>


                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            กลับหน้าหลัก
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            ลงทะเบียนผู้ใช้
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <>
            <div>
                no login
            </div>


        </>
    )

}