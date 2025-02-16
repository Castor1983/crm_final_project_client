export const COLUMNS_NAME ={
    orderColumnsName: ['id', 'name', 'surname', 'email', 'phone', 'age', 'course', 'course_format', 'course_type', 'status', 'sum', 'alreadyPaid',
    'created_at', 'utm', 'msg'],
    orderSearchTitle: ['name', 'surname', 'email', 'phone', 'age' ],
    orderExcelColumns: [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Surname', key: 'surname', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Course', key: 'course', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Age', key: 'age', width: 15 },
        { header: 'Format', key: 'course_format', width: 15 },
        { header: 'Type', key: 'course_type', width: 15 },
        { header: 'Sum', key: 'sum', width: 15 },
        { header: 'Already paid', key: 'alreadyPaid', width: 15 },
        { header: 'Create', key: 'create_at', width: 15 },
        { header: 'Utm', key: 'utm', width: 15 },
        { header: 'Msg', key: 'msg', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Group', key: 'group', width: 15 },
        { header: 'Manager', key: 'manager', width: 15 },
    ],
    statsColumnsRequest: [
        'COUNT(order.id) AS total',
        `SUM(CASE WHEN order.status = :inWork THEN 1 ELSE 0 END) AS in_work`,
        `SUM(CASE WHEN order.status = :new THEN 1 ELSE 0 END) AS new`,
        'SUM(CASE WHEN order.status = :agree THEN 1 ELSE 0 END) AS agree',
        'SUM(CASE WHEN order.status = :disagree THEN 1 ELSE 0 END) AS disagree',
        'SUM(CASE WHEN order.status = :dubbing THEN 1 ELSE 0 END) AS dubbing',
        'SUM(CASE WHEN order.status IS NULL THEN 1 ELSE 0 END) AS null_count'
    ]
}
export const DESC_ASC = ['DESC', 'ASC']