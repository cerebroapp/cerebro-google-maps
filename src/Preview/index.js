const React = require('react')
const GoogleMap = require('react-google-maps/lib/GoogleMap')
// eslint-disable-next-line no-unused-vars
const GoogleMapLoader = require('react-google-maps/lib/GoogleMapLoader')
const ScriptjsLoader = require('react-google-maps/lib/async/ScriptjsLoader')
const { triggerEvent } = require('react-google-maps/lib/utils')
const Marker = require('react-google-maps/lib/Marker')
const styles = require('./styles.css')

class Preview extends React.Component {
  /**
   * Fit google maps to geocoded viewport
   *
   * @param  {GoogleMap} map Ref to GoogleMap component
   */
  fitBounds() {
    const { map } = this
    if (!map) return
    // eslint-disable-next-line no-undef
    const bounds = new google.maps.LatLngBounds()
    bounds.extend(this.props.geometry.location)
    const { viewport } = this.props.geometry
    if (viewport) {
      Object.keys(viewport).forEach(key => bounds.extend(viewport[key]))
    }
    map.fitBounds(bounds)
  }
  render() {
    const { location } = this.props.geometry
    const { name } = this.props

    const marker = {
      position: location,
      key: name
    }

    return (
      <ScriptjsLoader
        protocol={"https"}
        hostname={"maps.googleapis.com"}
        pathname={"/maps/api/js"}
        query={{ libraries: 'geometry,drawing,places' }}
        loadingElement={<div />}
        containerElement={<div className={styles.container} />}
        googleMapElement={
          <GoogleMap
            ref={(map) => (this.map = map) && this.fitBounds()}
            defaultZoom={3}
            defaultCenter={location}
          >
            <Marker {...marker} />
          </GoogleMap>
        }
      />
    )
  }
}

Preview.propTypes = {
  name: React.PropTypes.string,
  geometry: React.PropTypes.shape({
    location: React.PropTypes.object,
    viewport: React.PropTypes.object
  })
}

module.exports = Preview
