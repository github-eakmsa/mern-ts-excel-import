import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import Swal from "sweetalert2";
import { IWork } from "../../interfaces/Work"
import { WorkService } from "../../services/work.service";
import { WorkState, setData, setWorks } from "../../features/work/workSlice";

export const WorksTable = () => {

    const { work } = useSelector((state: { work: WorkState }) => state);

    const workService = new WorkService();

    const dispatch = useDispatch();

    const fetchData = async () => {
        try {
            const res: IWork[] = await workService.getAll()
            dispatch(setWorks(res))
        } catch (error) {
            console.log('Error loading data', error)
        }
    }

    useEffect(() => {
        fetchData()
    })

    const onClickDelete = (item: IWork) => {

        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
        }).then((result) => {
            if (result.isConfirmed) {
                fetchDelete(item)
            }
        })

    }

    const fetchDelete = async (item: IWork) => {
        try {
            await workService.delete(item)

            Swal.fire({
                icon: 'success',
                title: 'the item has been deleted',
                showConfirmButton: false
            })

            fetchData()

        } catch (error) {
            console.log('Error to delete', error)
        }
    }

    const onClickInfo = async (item: IWork) => {

        try {

            const data: IWork = await workService.getById(item.id!)

            Swal.fire({
                title: 'Details',
                icon: 'info',
                html:
                `<p>
                    <tr><td><b>Item No</b> <br/>${data.item_no} <br/> </td></tr>
                    <tr><td><b>Description</b> <br/>${data.desc} <br/> </td></tr>
                    <tr><td><b>Unit</b> <br/>${data.unit} <br/> </td></tr>
                    <tr><td><b>Quantity</b> <br/>${data.qty} <br/> </td></tr>
                    <tr><td><b>Rate</b> <br/>${data.rate} <br/> </td></tr>
                    <tr><td><b>Amount</b> <br/>${data.amt} <br/> </td></tr>
                    <tr><td><b>Created On</b> <br/>${data.createdAt} <br/> </td></tr>
                    <tr><td><b>Updated On</b> <br/>${data.updatedAt} <br/> </td></tr>
                </p>`,
                showCloseButton: false,
                showCancelButton: false,
                confirmButtonText: 'Ok'
            })

        } catch (error) {
            console.log('Error ', error)
        }
    }

    return (
        <div className="row">
            <div className="col">

                <table className="table table-bordered" id="myTable">
                    <thead className="">
                        <tr>
                            <th>Item No</th>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Amt</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            work && 
                            work.list.map((item: IWork, i) => {
                                return (
                                    <tr key={i}>
                                        <td>
                                            {item.item_no}
                                        </td>
                                        <td>
                                            {item.desc}
                                        </td>
                                        <td>
                                            {item.qty}
                                        </td>
                                        <td>
                                            {item.amt}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">

                                                <button className="btn btn-sm btn-info" onClick={() => onClickInfo(item)}>
                                                    Info
                                                </button> | 

                                                <button className="btn btn-sm btn-warning" onClick={() => dispatch(setData(item))}>
                                                    Edit
                                                </button> | 

                                                <button className="btn btn-sm btn-danger" onClick={() => onClickDelete(item)}>
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}