import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";


interface AddressInputProps {
    value?: string;
    onSelect: (address: string) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
const AddressInput: React.FC<AddressInputProps> = ({ value, onSelect, onChange }) => {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  
    const handleLoad = (auto: google.maps.places.Autocomplete) => setAutocomplete(auto);
  
    const handlePlaceChanged = () => {
      if (autocomplete) {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onSelect(place.formatted_address); // Guarda la dirección seleccionada
        }
      }
    };
  
    return (
      <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
        <Input
                    id="address"
                    name="address"
                    placeholder="Direccion"
                    className="pl-10"
                    value={value}
                    onChange={onChange}
                    required
                  />
      </Autocomplete>
    );
  };
  

export default AddressInput;
