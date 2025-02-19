import {Circles} from "react-loader-spinner";
import useLoaderStore from "../../store/loader.ts";


const LoaderComponent = () => {
    const loading = useLoaderStore((state) => state.loading);

    return loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
            <div >
                <Circles
                    height="150"
                    width="150"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        </div>
                ) : null ;
                };

                export default LoaderComponent;