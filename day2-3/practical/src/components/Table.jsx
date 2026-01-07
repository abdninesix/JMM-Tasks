import React from 'react'

const Table = () => {
    return (
        <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            width="100%"
            align="center"
            summary="Employee details table"
        >
            <caption>Employee Information</caption>

            <colgroup>
                <col span="1" width="10%" />
                <col span="1" width="30%" />
                <col span="1" width="30%" />
                <col span="1" width="30%" />
            </colgroup>

            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Salary</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td rowSpan={2}>Ali</td>
                    <td>Engineering</td>
                    <td>$4000</td>
                </tr>

                <tr>
                    <th scope="row">2</th>
                    <td>Engineering</td>
                    <td>$4200</td>
                </tr>

                <tr>
                    <th scope="row">3</th>
                    <td colSpan={2}>HR Department</td>
                    <td>$3500</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td colSpan={3} align="right">Total Employees</td>
                    <td>3</td>
                </tr>
            </tfoot>
        </table>
    )
}

export default Table