import { CourseEnum } from '../enums/course.enum.ts';
import { StatusEnum } from '../enums/status.enum.ts';
import { CourseTypeEnum } from '../enums/courseType.enum.ts';
import { CourseFormatEnum } from '../enums/courseFormat.enum.ts';

export interface Filters {
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: string;
  course: string;
  course_format: string;
  course_type: string;
  status: string;
  group: string;
  manager: boolean;
  start_day: string;
  end_day: string;
}

export const getInitialFilters = (searchParams: URLSearchParams): Filters => ({
  name: searchParams.get('name') || '',
  surname: searchParams.get('surname') || '',
  email: searchParams.get('email') || '',
  phone: searchParams.get('phone') || '',
  age: searchParams.get('age') || '',
  course: (searchParams.get('course') as CourseEnum) || CourseEnum.EMPTY,
  course_format:
    (searchParams.get('course_format') as CourseFormatEnum) ||
    CourseFormatEnum.EMPTY,
  course_type:
    (searchParams.get('course_type') as CourseTypeEnum) || CourseTypeEnum.EMPTY,
  status: (searchParams.get('status') as StatusEnum) || StatusEnum.EMPTY,
  group: searchParams.get('group') || '',
  manager: searchParams.get('manager') === 'true',
  start_day: searchParams.get('start_day') || '',
  end_day: searchParams.get('end_day') || '',
});
