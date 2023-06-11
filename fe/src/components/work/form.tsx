import { IWork, Work } from "../../interfaces/Work";
import { useDispatch, useSelector } from "react-redux";
import { WorkState, setData, setWorks } from '../../features/work/workSlice';
import { WorkService } from "../../services/work.service";
import Swal from "sweetalert2";
import { useState } from "react";

export const Form = () => {

    const { work } = useSelector((state: { work: WorkState }) => state);

    const [errorForm, setErrorForm] = useState({
        item_no: false,
        desc: false,
        unit: false,
        qty: false,
        rate: false,
        amt: false,
    })

    const dispatch = useDispatch();

    const workService = new WorkService();

    const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setData({ ...work.data, [event.target.id]: event.target.value }))
    }

    const isValidForm = () => {

        const error = { item_no: false, desc: false, unit: false, qty: false, rate: false, amt: false }

        if (!work.data.item_no) error.item_no = true
        if (!work.data.desc) error.desc = true;
        if (!work.data.unit) error.unit = true;
        if (!work.data.qty) error.qty = true;
        if (!work.data.rate) error.rate = true;
        if (!work.data.amt) error.amt = true;

        setErrorForm(error)

        return error.item_no || error.desc || error.unit || error.qty || error.rate || error.amt;
    }

    const fetchUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const data: IWork = await workService.put(work.data)
            // add item
            const dataArray: IWork[] = [...work.list]
            // search index 
            let index: number = dataArray.findIndex((item: IWork) => item.id === data.id)
            // replace item 
            dataArray.splice(index, 1, data);
            //update item
            dispatch(setWorks(dataArray))
            // for clean form
            dispatch(setData(new Work()))

            Swal.fire({
                icon: 'success',
                title: 'The data has been updated'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCreate = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            // valid fields 
            if (isValidForm()) return null;

            const data: IWork = await workService.post(work.data)
            // for clean form
            dispatch(setData(new Work()))
            // add item
            const dataArray: IWork[] = [...work.list]
            dataArray.push(data)
            dispatch(setWorks(dataArray))

            Swal.fire({
                icon: 'success',
                title: 'The data has been saved'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const inputCSS = "form-control"
    const inputError = "error"

    return (
        <div className="card">
            <div className="card-body">

            <form onSubmit={(e) => work.data.id ? fetchUpdate(e) : fetchCreate(e)}>

                <div className="row form-group">
                    <div className="col-4">
                    </div>
                    <div className="col-8">
                        <h5>Create/Update Data Item</h5>
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-4">
                        <label className="">
                            Item No.
                        </label>
                    </div>
                    <div className="col-8">
                        <input
                            id="item_no"
                                type="number"
                                step="0.01"
                                placeholder="Item No."
                            value={work.data.item_no}
                            onChange={(e) => setFormValue(e)}
                            className={errorForm.item_no ? inputCSS + inputError : inputCSS} />
                        {
                        errorForm.item_no && 
                        <p className="mt-1 text-m text-red-400">
                            This field is required
                            </p>
                            }
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-4">
                        <label className="">
                            Description
                        </label>
                    </div>
                    <div className="col-8">
                        <input
                            id="desc"
                            type="text"
                            placeholder="Description"
                            value={work.data.desc}
                            onChange={(e) => setFormValue(e)}
                            className={errorForm.desc ? inputCSS + inputError : inputCSS} />
                        {
                            errorForm.desc &&
                            <p className="mt-1 text-m text-red-400">
                                This field is required
                            </p>
                        }
                    </div>
                </div>

                <div className="row form-group">
                    <div className="col-4">
                        <label className="">
                            Unit
                        </label>
                    </div>
                    <div className="col-8">
                        <input
                            id="unit"
                            type="text"
                            placeholder="Unit"
                            value={work.data.unit}
                            onChange={(e) => setFormValue(e)}
                            className={errorForm.unit ? inputCSS + inputError : inputCSS} />
                        {
                            errorForm.unit &&
                            <p className="mt-1 text-m text-red-400">
                                This field is required
                            </p>
                        }
                    </div>
                </div>

                    <div className="row form-group">
                        <div className="col-4">
                            <label className="">
                                Quantity
                            </label>
                        </div>
                        <div className="col-8">
                            <input
                                id="qty"
                                type="number"
                                step="0.01"
                                placeholder="Quantity"
                                value={work.data.qty}
                                onChange={(e) => setFormValue(e)}
                                className={errorForm.qty ? inputCSS + inputError : inputCSS} />
                            {
                                errorForm.qty &&
                                <p className="mt-1 text-m text-red-400">
                                    This field is required
                                </p>
                            }
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-4">
                            <label className="">
                                Rate
                            </label>
                        </div>
                        <div className="col-8">
                            <input
                                id="rate"
                                type="number"
                                step="0.01"
                                placeholder="Rate"
                                value={work.data.rate}
                                onChange={(e) => setFormValue(e)}
                                className={errorForm.rate ? inputCSS + inputError : inputCSS} />
                            {
                                errorForm.rate &&
                                <p className="mt-1 text-m text-red-400">
                                    This field is required
                                </p>
                            }
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-4">
                            <label className="">
                                Amount
                            </label>
                        </div>
                        <div className="col-8">
                            <input
                                id="amt"
                                type="number"
                                step="0.01"
                                placeholder="Amount"
                                value={work.data.amt}
                                onChange={(e) => setFormValue(e)}
                                className={errorForm.amt ? inputCSS + inputError : inputCSS} />
                            {
                                errorForm.amt &&
                                <p className="mt-1 text-m text-red-400">
                                    This field is required
                                </p>
                            }
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-4">
                        </div>
                        <div className="col-8">
                            <button className="btn btn-success btn-block">
                                {work.data.id ? "Save" : "Create"}
                            </button>
                        </div>
                    </div>
            </form>
            </div>
        </div>
    )
}