import {FC, useCallback, useEffect, useMemo, useState} from "react";
import * as ExcelJS from 'exceljs';
import { saveAs } from "file-saver";

import {FaFileExcel} from "react-icons/fa";
import { debounce } from "lodash";
import {useSearchParams} from "react-router-dom";
import {CourseEnum} from "../../enums/course.enum.ts";
import {CourseFormatEnum} from "../../enums/courseFormat.enum.ts";
import {CourseTypeEnum} from "../../enums/courseType.enum.ts";
import {StatusEnum} from "../../enums/status.enum.ts";
import {useGroupsStore} from "../../store/groups.ts";
import { RiResetRightFill} from "react-icons/ri";
import {COLUMNS_NAME} from "../../common/constants.ts";
import {Order} from "../../interfaces/order.interface.ts";
import {urls} from "../../common/urls.ts";
import {apiAuth} from "../../services/api.ts";
import {Filters, getInitialFilters} from "../../interfaces/filters.interface.ts";
import {buttonClass, inputClass} from "../../styles/styles.ts";


const FilterOrdersComponent: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {groups, setGroups} = useGroupsStore();
    const [filters, setFilters] = useState<Filters>(getInitialFilters(searchParams));

    useEffect(() => {
        fetchGroups()
    }, []);
    const fetchGroups = async () => {
        try {
            const response = await apiAuth.get(urls.orders.groups);
            setGroups(response.data);
        } catch (error) {
            console.error("Error when removing a group:", error);
        }
    }

    const debouncedUpdateFilters = useMemo(
        () =>
            debounce((newFilters) => {
                const filteredParams = Object.fromEntries(
                    Object.entries(newFilters)
                        .filter(([, value]) => value !== "" && value !== false)
                        .map(([key, value]) => [key, String(value)]) // Преобразуем в строки
                );
                setSearchParams(filteredParams);
            }, 500),
        [setSearchParams]
    );

    const updateFilters = useCallback(
        (newFilters: Filters) => {
            setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
            debouncedUpdateFilters(newFilters);
        },
        [debouncedUpdateFilters]
    );

const exportToExcel =  async () => {
        const params = {
            ...Object.fromEntries(searchParams.entries())
        };

        const response = await apiAuth.get(urls.orders.exportToExcel, {
            params: params,
        });
    const orders: Order[] = response.data.data
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = COLUMNS_NAME.orderExcelColumns.map(col => ({
        header: col.header,
        key: col.key,
        width: col.width || 20,
    }));

    orders.forEach((order) => {
        worksheet.addRow(order);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}.${now.getDate()}.${now.getFullYear()}`;
    const fileName = `${formattedDate}.xlsx`;
    saveAs(blob, fileName);

    }

    return (
        <div className="grid grid-cols-7 grid-rows-2">

            <input
                type="text"
                placeholder="Name"
                value={filters.name}
                onChange={(e) => updateFilters({...filters, name: e.target.value})}
                className= {inputClass}
            />
            <input
                type="text"
                placeholder="Surname"
                value={filters.surname}
                onChange={(e) => updateFilters({...filters, surname: e.target.value})}
                className={inputClass}
            />
            <input
                type="text"
                placeholder="Email"
                value={filters.email}
                onChange={(e) => updateFilters({...filters, email: e.target.value})}
                className={inputClass}
            />
            <input
                type="text"
                placeholder="Phone"
                value={filters.phone}
                onChange={(e) => updateFilters({...filters, phone: e.target.value})}
                className={inputClass}
            />
            <input
                type="number"
                placeholder="Age"
                value={filters.age}
                onChange={(e) => updateFilters({...filters, age: e.target.value})}
                className="bg-gray-200 p-2 rounded appearance-none no-spinner focus:outline-none m-1 "
            />
            <select
                value={filters.course}
                onChange={(e) => updateFilters({...filters, course: e.target.value})}
                className={inputClass}
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
                    className={inputClass}
            >
                <option value={CourseFormatEnum.EMPTY}>all formats</option>
                <option value={CourseFormatEnum.ONLINE}>online</option>
                <option value={CourseFormatEnum.STATIC}>static</option>
            </select>

            <select value={filters.course_type}
                    onChange={(e) => updateFilters({...filters, course_type: e.target.value})}
                    className={inputClass}
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
                    className={inputClass}
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
                    className={inputClass}
            >
                <option value="">all groups</option>
                {groups.map((group, index) => (
                    <option key={index} value={group.name}>{group.name}</option>
                ))}
            </select>

            <input
                type="date"
                value={filters.start_day}
                onChange={(e) => updateFilters({...filters, start_day: e.target.value})}
                min="2000-01-01"
                max="2040-12-31"
                className={inputClass}
            />
            <input
                type="date"
                value={filters.end_day}
                onChange={(e) => updateFilters({...filters, end_day: e.target.value})}
                min="2000-01-01"
                max="2040-12-31"
                className={inputClass}
            />

            <div className="col-start-7 row-start-1 row-end-2 flex items-center">
                <label className="p-1">
                    <input
                        type="checkbox"
                        checked={filters.manager}
                        onChange={() => updateFilters({...filters, manager: !filters.manager})}
                    />
                    My
                </label>
                <button onClick={() => updateFilters(getInitialFilters(new URLSearchParams()))}
                        className={buttonClass}>
                    <RiResetRightFill size={20}/>

                </button>
                <button onClick={exportToExcel}
                        className={buttonClass}>
                    <FaFileExcel size={20}/>
                </button>
            </div>

        </div>
    );
};

export default FilterOrdersComponent;