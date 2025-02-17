import { ResponsivePie } from "@nivo/pie";
import { tokens } from '../../../theme';
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

// Action
import { getAllCategoryAction } from '../../../store/actions/user/apiRequest.action';
import { useEffect } from "react";

const PieChart = ({ isDashBoard }) => {
  const { listCategory } = useSelector(reduxData => reduxData.categoryAdminReducer);
  const { categoryList } = listCategory;

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    dispatch(getAllCategoryAction());
  }, [])


  const dataCategory = categoryList?.map(item => {
    return {
      id: item.name,
      label: item.name,
      value: item.countProduct,
      color: item.color
    }
  })

  const data = [
    {
      id: "hack",
      label: "hack",
      value: 239,
      color: "hsl(104, 70%, 50%)",
    },
    {
      id: "make",
      label: "make",
      value: 170,
      color: "hsl(162, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 322,
      color: "hsl(291, 70%, 50%)",
    },
    {
      id: "lisp",
      label: "lisp",
      value: 503,
      color: "hsl(229, 70%, 50%)",
    },
    {
      id: "scala",
      label: "scala",
      value: 584,
      color: "hsl(344, 70%, 50%)",
    },
  ];

  return (
    <ResponsivePie
      data={dataCategory ? dataCategory : data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            }
          },
          legend: {
            text: {
              fill: colors.grey[100]
            }
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1
            },
            text: {
              fill: colors.grey[100]
            }
          }
        },
        legends: {
          text: {
            fill: colors.grey[100]
          }
        }
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            0.2
          ]
        ]
      }}
      // enableArcLinkLabels={true}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [
          [
            'darker',
            2
          ]
        ]
      }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  );
};

export default PieChart;