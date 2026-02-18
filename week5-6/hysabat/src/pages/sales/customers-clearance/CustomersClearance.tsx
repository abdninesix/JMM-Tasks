import { gql } from "@apollo/client"
import { useQuery } from "@apollo/client/react"
import { Loader2Icon } from "lucide-react";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

type Location = {
    id: string
    name: string
    description: string
    photo: string
}

type LocationsQueryData = {
    locations: Location[]
}

const CustomersClearance = () => {

    const { loading, error, data } = useQuery<LocationsQueryData>(GET_LOCATIONS);

    return (
        <div>
            <h1 className="text-4xl text-center mb-4">Apollo client test</h1>
            {loading ? <div className="h-[60dvh] flex items-center justify-center"><Loader2Icon className="animate-spin" /></div> :
                error ? <p>{error.message}</p> :
                    (
                        <ul className="grid grid-cols-3 gap-4">
                            {data?.locations.map((location) => (
                                <li key={location.id} className="bg-accent rounded-md p-4 space-y-2">
                                    <h1 className="text-2xl font-semibold">{location.name}</h1>
                                    <img src={location.photo} alt={location.name} className="w-full rounded-md" />
                                    <p>{location.description.slice(0, 300) + (location.description.length > 300 ? '......' : '')}</p>
                                </li>
                            ))}
                        </ul>
                    )}
        </div>
    )
}

export default CustomersClearance