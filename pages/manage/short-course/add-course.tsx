"use client"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react";
import { z } from "zod";

export default function Home() {

    const [addCourseForm, setAddCourseForm] = useState({
        lecturerCount: 1,
        courseName: "",
    });

    const { data: session } = useSession()

    //var
    const [dayCount, setDayCount] = useState(1);
    const [dates, setDates] = useState<string[]>([]);

    const [lecturerCount, setLecturerCount] = useState(1);
    const [lecturers, setLecturers] = useState<string[]>([]);




    //dymaic input

    //lecturer count
    const handleLecturerCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '' && parseInt(e.target.value, 10) > 0) {
            const count = parseInt(e.target.value, 10);
            setLecturerCount(count);
            setLecturers(Array(count).fill(''));
        } else {
            setLecturers(['']);
        }
    };

    const handleLecturerChange = (index: number, value: string) => {
        const newLecturers = [...lecturers];
        newLecturers[index] = value;
        setLecturers(newLecturers);
    };

    //day count
    const handleDayCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '' && parseInt(e.target.value, 10) > 0) {
            const count = parseInt(e.target.value, 10);
            setDayCount(count);
            setDates(Array(count).fill(''));
        } else {
            setDayCount(1);
            setDates(['']);
        }
    };

    const handleDateChange = (index: number, value: string) => {
        const newDates = [...dates];
        newDates[index] = value;
        setDates(newDates);
    };

    const handleAddCourse = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddCourseForm({
            ...addCourseForm,
            courseName: e.target.value
        });
    }

    const [errors, setErrors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (session && session.user) {
        return (
            <div className="m-12">
                <form>
                    <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-semibold leading-7 text-gray-900 text-xl text-center">ลงทะเบียนเพื่อจัด Short Course</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                นักศึกษาหรือผู้ที่สนใจให้ความรู้ในเรื่องต่าง ๆ สามารถสร้างคอร์สเรียนเป็นระยะเวลาสั้นเพื่อเผยแพร่ความรู้และเพิ่มทักษะให้กับนักศึกษาที่สนใจ
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-1">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        จำนวนผู้สอน
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            id="lecturer-count"
                                            name="lecturer-count"
                                            autoComplete="lecturer-count"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleLecturerCountChange}
                                        >
                                        </input>
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        บัญชีผู้ใช้
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            disabled
                                            value={session.user.name || ''}
                                            type="text"
                                            id="lecturer-count"
                                            name="lecturer-count"
                                            autoComplete="lecturer-count"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            onChange={handleLecturerCountChange}
                                        >
                                        </input>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {lecturers.map((lecturer, index) => (
                            <>
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="font-semibold leading-7 text-gray-900 text-xl">ข้อมูลผู้สอน Short Course {index + 1}</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        กรอกเป็นภาษาไทยหรือภาษาอังกฤษ ซึ่งนำจะไปแสดงในป้ายประชาสัมพันธ์
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
                                                    <option>อาจารย์</option>
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
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
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
                                                รูปที่ใช้ในการประชาสัมพันธ์
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
                                                ตำแหน่ง หรือชั้นปี
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    id="country"
                                                    name="country"
                                                    autoComplete="country-name"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                >
                                                    <option>เลือกตำแหน่งหรือชั้นปี</option>
                                                    <option>นักศึกษาชั้นปีที่ 1</option>
                                                    <option>นักศึกษาชั้นปีที่ 2</option>
                                                    <option>นักศึกษาชั้นปีที่ 3</option>
                                                    <option>นักศึกษาชั้นปีที่ 4</option>
                                                    <option>นักศึกษาชั้นปีที่ 5</option>
                                                    <option>นักศึกษาชั้นปีที่ 6</option>
                                                    <option>อาจารย์</option>
                                                    <option>บัณฑิต</option>
                                                    <option>อื่น ๆ </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                                ที่อยู่อีเมล
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="email"
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



                                    </div>
                                </div>
                            </>
                        ))
                        }









                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-semibold leading-7 text-gray-900 text-xl">ข้อมูล Short Course</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">กรอกข้อมูลคอร์สอย่างละเอียดกรอกเป็นภาษาไทยหรือภาษาอังกฤษเพื่อใช้ในการประชาสัมพันธ์</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        ชื่อคอร์ส
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="course-name"
                                            id="course-name"
                                            autoComplete="course-name"
                                            placeholder=""
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleAddCourse}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-4">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        คำอธิบายคอร์สโดยสังเขป
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="course-name"
                                            id="course-name"
                                            autoComplete="course-name"
                                            placeholder=""
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        เนื้อหา และหัวเรื่องที่สอนในคอร์สทั้งหมด
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={5}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="สามารถแยกเป็นวันได้"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        อุปกรณ์ที่ต้องการให้ผู้เรียนเตรียมมา
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="เช่น Laptop, iPad, Arduino UNO R3, Micro:bit"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        เครื่องมือ หรือซอฟต์แวร์ที่ต้องการให้ผู้เรียนเตรียมมา
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="เช่น VS Code, IDE, Unity, Unreal Engine, Node Module"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        สิ่งที่ต้องการแจ้งเพิ่มเติมให้ <b>ผู้เรียน</b> ทราบ
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="หากไม่มี สามารถข้ามได้"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        สิ่งที่ต้องการแจ้งเพิ่มเติมให้ <b>ผู้ดูแล Short Course</b> ทราบ
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="หากไม่มี สามารถข้ามได้"
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>



                            </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="font-semibold leading-7 text-gray-900 text-xl">วัน เวลา และรูปแบบการจัดการเรียนการสอน</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">กรอกข้อมูลให้ครบถ้วนเพื่อใช้ในการประชาสัมพันธ์</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <label htmlFor="day-count" className="block text-sm font-medium leading-6 text-gray-900">
                                        จำนวนวันที่จัดการเรียนการสอน
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="course-name"
                                            id="course-name"
                                            autoComplete="course-name"
                                            placeholder=""
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleDayCountChange}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-4">
                                </div>

                                {dates.map((date, index) => (
                                    <>
                                        <div className="col-span-2">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                วันที่ {index + 1} (วัน/เดือน/ปี ค.ศ.)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="date"
                                                    id="about"
                                                    name="about"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder=""
                                                    defaultValue={''} />
                                            </div>
                                        </div><div className="col-span-2">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                เวลาเริ่มของวันที่ {index + 1} (รูปแบบ 24 ชม.)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="time"
                                                    id="about"
                                                    name="about"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder=""
                                                    defaultValue={''} />
                                            </div>
                                        </div><div className="col-span-2">
                                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                                เวลาสิ้นสุดของวันที่ {index + 1} (รูปแบบ 24 ชม.)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="time"
                                                    id="about"
                                                    name="about"
                                                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    placeholder=""
                                                    defaultValue={''} />
                                            </div>
                                        </div>
                                    </>
                                ))}

                                <div className="sm:col-span-2">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        รูปแบบการสอน
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>เลือกรูปแบบการสอน</option>
                                            <option>Online</option>
                                            <option>On-Site</option>
                                            <option>Hybrid</option>
                                            <option>On-demand</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        บันทึกวิดีโอเพื่อเรียนย้อนหลัง
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>ต้องการหรือไม่</option>
                                            <option>บันทึกวิดีโอ ส่งใน Discord ห้องเรียน</option>
                                            <option>บันทึกวิดีโอ แต่ส่งให้ผู้ที่เข้าเรียนเท่านั้น</option>
                                            <option>ไม่บันทึกวิดีโอ</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        ให้ผู้ดูแล Short Course ช่วยบันทึกวิดีโอหรือไม่
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>ต้องการหรือไม่</option>
                                            <option>ต้องการ</option>
                                            <option>ไม่ต้องการ (ผู้สอนบันทึกเอง)</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        ชื่อผู้ใช้ Discord
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="about"
                                            name="about"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder=""
                                            defaultValue={''}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        ให้ผู้สอนเข้าร่วม Discord ด้วย
                                    </label>
                                    <div className="mt-2">
                                        <Link href="https://discord.gg/3SAS6YBFG7" target="_blank">Discord : https://discord.gg/3SAS6YBFG7</Link>
                                    </div>
                                </div>




                            </div>
                        </div>


                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            สร้างคอร์ส
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