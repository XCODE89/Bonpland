import { useProperties } from '@/modules/properties/hooks/useProperties'
import { useProperty } from '@/modules/properties/hooks/useProperty'

export const About = () => {
const {data} = useProperties()
const {data:property} = useProperty("67c8783df8489680912224fb")
  return (
    <>
        {/* {data?.map((property , index) => (
            <div key={index}>{property.name}</div>

        ))} */}
        listando
        {console.log(data)}
        {console.log(property)}
    </>
  )
}
