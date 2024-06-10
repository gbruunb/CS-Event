import { z } from 'zod';

const registerSchema = z.object({
    firstname: z.string().min(1, {message: "กรุณากรอกชื่อจริง"}),
    studentID: z.number().refine((val) => val.toString().length === 10, {message: "รหัสนักศึกษาต้องมี 8 หลัก"}),  
});

export default registerSchema;
