import { Box } from "@mui/material";
import Header from "../../../components/AdminPage/Header";
import PieChart from "../../../components/AdminPage/PieChart/PieChart";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Chart of Category" />

      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;