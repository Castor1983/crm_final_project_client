import {CourseEnum} from "../enums/course.enum.ts";
import {CourseFormatEnum} from "../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../enums/courseType.enum.ts";
import {StatusEnum} from "../enums/status.enum.ts";

export interface Order {
    id: number;
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course: CourseEnum,
    course_format: CourseFormatEnum,
    course_type: CourseTypeEnum,
    status: StatusEnum,
    sum: number,
    alreadyPaid: number,
    created_at: Date

}