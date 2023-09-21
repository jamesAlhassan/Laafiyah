import { useQuery } from "@tanstack/react-query";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "./AllDoctors.css";
import newRequest from "../../utils/newRequest";

const AllDoctors = () => {

    const { isLoading, error, data, refetch } = useQuery({
        queryKey:[],
        queryFn: () =>
            newRequest.get(
                '/doctor'
            ).then((res) => {
                console.log(res.data)
                return res.data;
            }),
    });

    // when page is loading
    if (isLoading) return <div>Loading</div>;

    // when there is an error
    if (error) return <div>An eror has occured</div>

    return (
        <div className="allDoctors">
        
            <ul>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
                <li><DoctorCard /></li>
            </ul>
        </div>
    );
}

export default AllDoctors;