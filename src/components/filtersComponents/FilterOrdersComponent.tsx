import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {FaFileExcel} from "react-icons/fa";
import { debounce } from "lodash";
import {useSearchParams} from "react-router-dom";
import {CourseEnum} from "../../enums/course.enum.ts";
import {CourseFormatEnum} from "../../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../../enums/courseType.enum.ts";
import {StatusEnum} from "../../enums/status.enum.ts";
import {useGroupsStore} from "../../store/groups.ts";
import { RiResetRightFill} from "react-icons/ri";
import {useAuthStore} from "../../store/auth.ts";
import axios from "axios";


const FilterOrdersComponent: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {groups, setGroups} = useGroupsStore()
    const {accessToken} = useAuthStore()
    const [filters, setFilters] = useState({
        name: searchParams.get("name") || "",
        surname: searchParams.get("surname") || "",
        email: searchParams.get("email") || "",
        phone: searchParams.get("phone") || "",
        age: searchParams.get("age") || "",
        course: searchParams.get("course") || CourseEnum.EMPTY,
        course_format: searchParams.get("course_format") ||CourseFormatEnum.EMPTY,
        course_type: searchParams.get("course_type") || CourseTypeEnum.EMPTY,
        status: searchParams.get("status") || StatusEnum.EMPTY,
        group: searchParams.get("group") || "",
        manager: searchParams.get("manager") === "true",
    });

    useEffect(() => {
        fetchGroups()
    }, []);
    const fetchGroups = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/orders/groups", {//TODO
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            setGroups(response.data);
        } catch (error) {
            console.error("Помилка при отриманні груп:", error);
        }
    }


    const debouncedUpdateFilters = useMemo(
        () =>
            debounce((newFilters) => {
                const filteredParams = Object.fromEntries(
                    Object.entries(newFilters).filter(([_, value]) => value !== "" && value !== false)
                );
                setSearchParams(filteredParams);
            }, 500),
        [setSearchParams]
    );

    const updateFilters = useCallback(
        (newFilters) => {
            setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
            debouncedUpdateFilters(newFilters);
        },
        [debouncedUpdateFilters]
    );

    return (
        <div className="grid grid-cols-6 grid-rows-2">

            <input
                type="text"
                placeholder="Name"
                value={filters.name}
                onChange={(e) => updateFilters({...filters, name: e.target.value})}
                className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            />
            <input
                type="text"
                placeholder="Surname"
                value={filters.surname}
                onChange={(e) => updateFilters({...filters, surname: e.target.value})}
                className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            />
            <input
                type="text"
                placeholder="Email"
                value={filters.email}
                onChange={(e) => updateFilters({...filters, email: e.target.value})}
                className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            />
            <input
                type="text"
                placeholder="Phone"
                value={filters.phone}
                onChange={(e) => updateFilters({...filters, phone: e.target.value})}
                className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            />
            <input
                type="number"
                style={{ appearance: "textfield" }}
                placeholder="Age"
                value={filters.age}
                onChange={(e) => updateFilters({...filters, age: e.target.value})}
                className="bg-gray-200 p-2 rounded focus:outline-none m-1 "
            />
            <select
                value={filters.course}
                onChange={(e) => updateFilters({...filters, course: e.target.value})}
                className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            >
                <option value={CourseEnum.EMPTY}>all courses</option>
                <option value={CourseEnum.FE}>FE</option>
                <option value={CourseEnum.JCX}>JCX</option>
                <option value={CourseEnum.FS}>FS</option>
                <option value={CourseEnum.PCX}>PCX</option>
                <option value={CourseEnum.JSCX}>JSCX</option>
                <option value={CourseEnum.QACX}>QACX</option>
            </select>

            <select value={filters.course_format}
                    onChange={(e) => updateFilters({...filters, course_format: e.target.value})}
                    className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            >
                <option value={CourseFormatEnum.EMPTY}>all formats</option>
                <option value={CourseFormatEnum.ONLINE}>online</option>
                <option value={CourseFormatEnum.STATIC}>static</option>
            </select>

            <select value={filters.course_type}
                    onChange={(e) => updateFilters({...filters, course_type: e.target.value})}
                    className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            >
                <option value={CourseTypeEnum.EMPTY}>all types</option>
                <option value={CourseTypeEnum.PRO}>pro</option>
                <option value={CourseTypeEnum.INCUBATOR}>incubator</option>
                <option value={CourseTypeEnum.VIP}>vip</option>
                <option value={CourseTypeEnum.PREMIUM}>premium</option>
                <option value={CourseTypeEnum.MINIMAL}>minimal</option>
            </select>

            <select value={filters.status}
                    onChange={(e) => updateFilters({...filters, status: e.target.value})}
                    className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            >
                <option value={StatusEnum.EMPTY}>all statuses</option>
                <option value={StatusEnum.INWORK}>In work</option>
                <option value={StatusEnum.NEW}>New</option>
                <option value={StatusEnum.AGREE}>Agree</option>
                <option value={StatusEnum.DISAGREE}>Disagree</option>
                <option value={StatusEnum.DUBBING}>Dubbing</option>
            </select>

            <select value={filters.group}
                    onChange={(e) => updateFilters({...filters, group: e.target.value})}
                    className="bg-gray-200 p-2 rounded focus:outline-none m-1"
            >
                <option value="">all groups</option>
                {groups.map((group, index) => (
                    <option key={index} value={group.name}>{group.name}</option>
                ))}
            </select>

            <div className="col-start-6 row-start-1 row-end-2 flex items-center">
                <label className="p-1">
                    <input
                        type="checkbox"
                        checked={filters.manager}
                        onChange={() => updateFilters({...filters, manager: !filters.manager})}
                    />
                    My
                </label>
                <button onClick={() => updateFilters({name: "", surname: "", email: "",  phone: "", age: "", course: CourseEnum.EMPTY, course_type: CourseTypeEnum.EMPTY, course_format: CourseFormatEnum.EMPTY, status: StatusEnum.EMPTY, group: "", manager: false})}
                        className="bg-[#43a047] hover:bg-green-700 text-white m-1 p-2 rounded flex items-center gap-2">
                    <RiResetRightFill size={20}/>

                </button>
                <button onClick={() => updateFilters({name: "", surname: "", email: "", myOrders: false})}
                        className="bg-[#43a047] hover:bg-green-700 text-white m-1 p-2 rounded flex items-center gap-2">
                    <FaFileExcel size={20}/>
                </button>
            </div>

        </div>
    );
};

export default FilterOrdersComponent;