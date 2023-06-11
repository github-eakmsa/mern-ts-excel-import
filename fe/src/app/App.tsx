
import FileUpload from '../components/work/FileUpload';
import {Form} from '../components/work/form';
import {WorksTable} from '../components/work';

function App() {

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="col">
                    <h3>Excel File Upload</h3>
                    <p className='alert'>
                        using: React-Typescript, Node, Express, MySQL
                        </p>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
            <FileUpload />
            <Form />
                </div>
                <div className="col-8">
            <div className="row">
                <div className="col">
                    <h5>List of uploaded data items</h5>
                </div>
            </div>
            <WorksTable />
                </div>
            </div>
            <br />
        </div>
  );
}

export default App;
