import {CourseEnum} from "../enums/course.enum.ts";
import {CourseFormatEnum} from "../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../enums/courseType.enum.ts";
import {StatusEnum} from "../enums/status.enum.ts";

export interface Order {
    id: number;
    name: string| null,
    surname: string| null,
    email: string| null,
    phone: string| null,
    age: number| null,
    course: CourseEnum| null,
    course_format: CourseFormatEnum| null,
    course_type: CourseTypeEnum| null,
    status: StatusEnum| null,
    sum: number| null,
    alreadyPaid: number| null,
    utm: string| null,
    msg: string| null,
    created_at: string | null,
    group: string| null,
    manager: string| null,

}