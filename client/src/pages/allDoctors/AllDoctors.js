import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import DoctorCard from "../../components/doctorCard/DoctorCard";
import "./AllDoctors.css";

const AllDoctors = () => {

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: [],
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
            {
                data.doctors?.map((doctor) =>
                    <DoctorCard
                        className="doctorCard"
                        key={doctor._id}
                        doctor={doctor}
                    />)
            }
        </div>
    );
}

export default AllDoctors;