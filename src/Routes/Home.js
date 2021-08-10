import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { vaccineApi } from "../api";
import Chart from "../Components/Chart";
import Select from "../Components/Select";
import TodayStatistics from "../Components/TodayStatistics";
import { SIDO_LIST } from "../constants";

const Container = styled.div`
  max-width: 60rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
`;

const Home = () => {
  const [stat, setStat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("전국");
  const [startDate, setStartDate] = useState(null);

  const getStat = async (locationName, date) => {
    try {
      const {
        data: { data },
      } = await vaccineApi.stat(locationName, date);
      setStat(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStat(location, startDate);
  }, [location, startDate]);

  return (
    <Container>
      <Helmet title="Covid-19 Vaccinations" />
      <Title>💉Covid-19 Vaccinations📈</Title>
      <Select sidoList={SIDO_LIST} setLocation={setLocation} />
      <TodayStatistics loading={loading} today={stat[stat.length - 1]} />
      <Chart
        loading={loading}
        data={stat}
        location={location}
        setStartDate={setStartDate}
      />
    </Container>
  );
};

export default Home;
