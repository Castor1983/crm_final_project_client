import {FC, useCallback, useEffect, useMemo, useState} from "react";
import * as ExcelJS from 'exceljs';
import { saveAs } from "file-saver";
import { debounce } from "lodash";
import {useSearchParams} from "react-router-dom";

import {useGroupsStore} from "../../store/groups.ts";
import {COLUMNS_NAME} from "../../common/constants.ts";
import {Order} from "../../interfaces/order.interface.ts";
import {Filters, getInitialFilters} from "../../interfaces/filters.interface.ts";
import FilterFormComponent from "./FilterFormComponent.tsx";
import {fetchGroups, fetchOrdersExportToExcel} from "../../requests/requests.ts";


const FilterOrdersComponent: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {groups, setGroups} = useGroupsStore();
    const [filters, setFilters] = useState<Filters>(getInitialFilters(searchParams));

    useEffect(() => {
        fetchGroups(setGroups)
    }, []);


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

        const response =  await fetchOrdersExportToExcel(params)
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
        <FilterFormComponent groups={groups} filters={filters} updateFilters={updateFilters} exportToExcel={exportToExcel} />
    )
};

export default FilterOrdersComponent;