import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements AfterViewInit {

  constructor(public locationservice:LocationService){}
onCheckout() {
  const location = {
    address: this.locationInput,
    aptSuite : this.aptSuite,
    city : this.city,
    state : this.state,
    zip : this.zip,
    country : this.country,
  }
  this.locationservice.saveLocation(location).subscribe();
}
  @ViewChild('gmpMap') gmpMap: ElementRef | any;
  @ViewChild('locationInput') locationInput: ElementRef | any;
  @ViewChild('aptSuite') aptSuite: ElementRef | any;
  @ViewChild('city') city: ElementRef | any;
  @ViewChild('state') state: ElementRef | any;
  @ViewChild('zip') zip: ElementRef | any;
  @ViewChild('country') country: ElementRef | any;
  @ViewChild('lat') lat: ElementRef | any;
  @ViewChild('lng') lng: ElementRef | any;

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const CONFIGURATION = {
      ctaTitle: 'Checkout',
      mapOptions: {
        center: { lat: 37.4221, lng: -122.0841 },
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        zoom: 11,
        zoomControl: true,
        maxZoom: 22,
        mapId: ''
      },
      mapsApiKey: 'AIzaSyDvZkqm5AocfLgLooG-qTI4xdARnXPYNwc',
      capabilities: {
        addressAutocompleteControl: true,
        mapDisplayControl: true,
        ctaControl: true
      }
    };

    const componentForm: { [key: string]: string } = {
      street_number: 'City',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'Area',
      country: 'long_name',
      postal_code: 'short_name',
    };

    const getFormInputElement = (component: string) => {
      document.getElementById(component + '-input') as HTMLInputElement;
    };

    const map = new google.maps.Map(this.gmpMap.nativeElement, {
      zoom: CONFIGURATION.mapOptions.zoom,
      center: CONFIGURATION.mapOptions.center,
      mapTypeControl: false,
      fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
      zoomControl: CONFIGURATION.mapOptions.zoomControl,
      streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
    });

    const marker = new google.maps.Marker({ map, draggable: false });
    const autocompleteInput = this.locationInput.nativeElement as HTMLInputElement;

    if (autocompleteInput) {
      const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
        fields: ['address_components', 'geometry', 'name'],
        types: ['address'],
      });

      autocomplete.addListener('place_changed', () => {
        marker.setVisible(false);
        const place = autocomplete.getPlace();
        if (place.geometry) {
          this.renderAddress(place);
          this.fillInAddress(place);
        } else {
          window.alert(`No details available for input: '${place.name}'`);
        }
      });
    }
  }

  fillInAddress(place: google.maps.places.PlaceResult) {
    const addressNameFormat = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'Locality',
      administrative_area_level_1: 'short_name',
      country: 'Country',
      postal_code: 'Postal Code',
    };

    for (const type in addressNameFormat) {
      if (addressNameFormat.hasOwnProperty(type)) {
        const component = addressNameFormat[type as keyof typeof addressNameFormat];
        const value = this.getAddressComponentValue(place.address_components || [], type);
        const inputElement = this.getFormInputElement(type);
        if (inputElement) {
          inputElement.value = value;
        }
      }
    }
  }

  getAddressComponentValue(
    components: google.maps.GeocoderAddressComponent[], 
    type: string
  ): string {
    const addressNameFormat: { [key: string]: string } = {
      street_number: 'City',
      route: 'long_name',
      locality: 'Locality',
      administrative_area_level_1: 'short_name',
      country: 'Country',
      postal_code: 'Postal Code',
    };
  
    const component = components.find((c) => c.types.includes(type));
    return component ? addressNameFormat[type] : '';
  }
  

  renderAddress(place: google.maps.places.PlaceResult) {
    const map = new google.maps.Map(this.gmpMap.nativeElement);
    const marker = new google.maps.Marker({
      map,
      position: place.geometry?.location,
    });
  }

  private getFormInputElement(component: string): HTMLInputElement | null {
    return document.getElementById(component + '-input') as HTMLInputElement | null;
  }
  
}
