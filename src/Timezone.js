import './App.css';
import { Component } from 'react';
import { FormGroup, Col, Card, CardBody, CardHeader, Input, Row } from 'reactstrap';
import axios from "axios"
class Timezone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time_zones: '',
      selected_time_zone: '',
      time: '',
    }
  }
  componentDidMount = async () => {
    await this.getTimeZones();
  }
  getTimeZones = async () => {
    try {
      const { data } = await axios.get("http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/*");
      await this.setState({
        time_zones: data,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  };
  getTime = async () => {
    try {
      const { data } = await axios.get("http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json&zone=Europe/" + this.state.selected_time_zone);
      await this.setState({
        time: data,
      });
      console.log(data)
      return data;
    } catch (err) {
      return err.message;
    }
  }
  getDateTimeFromTimestamp(unixTimeStamp) {
    // let date = new Date(unixTimeStamp);
    // return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

    var myDate = new Date(unixTimeStamp * 1000);
    return myDate.toGMTString() ;
  }
  render() {
    return (
      <div className="App">
        <Card>
          <CardHeader>
            <strong>Europe Time zones</strong>
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Col>
                Slect Time Zone
              </Col>
              <Col>
                <Input type="select" value={this.state.selected_time_zone} onChange={e => this.setState({ selected_time_zone: e.target.value })}>
                  <option value="">Select time zone</option>
                  {
                    this.state.time_zones !== "" ?
                      this.state.time_zones.zones !== undefined ?
                        Array.isArray(this.state.time_zones.zones) ?
                          this.state.time_zones.zones
                            .map((zone, i) =>
                              <option key={i} value={zone.zoneName}>{zone.zoneName}</option>
                            )
                          :
                          "error"
                        :
                        "error"
                      :
                      "loading"
                  }
                </Input>
              </Col>
              
     
              
            </FormGroup>
            <hr></hr>
            {
              this.state.time_zones !== "" ?
                this.state.time_zones.zones !== undefined ?
                  Array.isArray(this.state.time_zones.zones) ?
                    this.state.time_zones.zones
                      .filter(zone => { return this.state.selected_time_zone !== "" ? zone.zoneName === this.state.selected_time_zone ? true : false : false }).map((zone, i) =>
                        <div key={i}>
                          <Row>
                            <Col>countryName</Col> <Col>{zone.countryName}</Col>
                          </Row>
                          <Row>
                            <Col>countryCode</Col> <Col>{zone.countryCode}</Col>
                          </Row>
                          <Row>
                            <Col>zoneName</Col> <Col>{zone.zoneName}</Col>
                          </Row>
                          <Row>
                            <Col>Time</Col><Col>{this.getDateTimeFromTimestamp(zone.timestamp)}</Col>
                          </Row>
                        </div>
                      )
                    :
                    "error"
                  :
                  "error"
                :
                "Select TIme Zone"
            }
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Timezone;
