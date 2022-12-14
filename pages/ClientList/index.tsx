import { useEffect, useRef, useState } from "react"
import SearchInput from "../SearchInput"
import DataService from '../../services/firebase-config'
import styles from './style.module.scss'
import { Toast } from 'primereact/toast';
import UpdateClient from "../UpdateClient"
import DeleteClient from "../DeleteClient";

const List = (props:any) => {
    const [text, setText] = useState('')
    const [list, setList] = useState<any>([])
    const [id, setId] = useState<any>()
    const [form, setForm] = useState<any>()
    const [handleClickOpen, SetHandleClickOpen] = useState(false)
    const [handleClickDel, SetHandleClickDel] = useState(false)
    const toast = useRef<any>(null);
    
    const showSuccess = () => {

        toast.current.show({ severity: 'success', summary: 'Success', detail: '', life: 3000 });
    }
    useEffect(() => {
        if (text) {

            async () => setList(

                (await DataService.getAll("clientes")).docs.map(p => p.data())

            )


            setList(list.filter((p: any) => p.nome.includes(text)))
        } else {
            const getClients = async () => {
                setList(

                    (await DataService.getAll("clientes")).docs.map(response => response.data())

                )


            }


            getClients()
        }

    }, [text])
    useEffect(() => {
        async function res() {
            setId(

                (await DataService.getAll("clientes")).docs.map(p => p.id)

            )
        }
        res()
    }, [])
    return (
        < >
            <div className={styles.list}>
                <div className={styles.search}>
                    <SearchInput value={text} onChange={(search: string) => setText(search)} />
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>
                                <strong>
                                    Nome
                                </strong>
                                <hr />
                            </td>
                            <td>
                                <strong>
                                    Valor
                                </strong>
                                <hr />
                            </td>
                            <td>
                                <strong>
                                    Data
                                </strong>
                                <hr />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((client: any, key: any) => {
                            return (
                                <tr key={key} onClick={() => {
                                    setForm(client)
                                    SetHandleClickOpen(true)
                                }}>

                                    <td>{client.nome}</td>
                                    <td>R$ {client.valor},00</td>
                                    <td>{client.data}</td>

                                </tr>

)
})}
                    </tbody>
                </table>
            </div>
            <Toast ref={toast} />

            {handleClickOpen ? <UpdateClient onClose={() => { SetHandleClickOpen(false) }} success={() => showSuccess()} id={id}  client={form}/> : null}
        </>
    )
}
export default List