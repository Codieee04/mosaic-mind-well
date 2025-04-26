
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface MoodData {
  date: string;
  mood: string;
  intensity: number;
}

interface MoodChartProps {
  moodData: MoodData[];
}

const MoodChart: React.FC<MoodChartProps> = ({ moodData }) => {
  // Format dates for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };
  
  // Prepare data for the chart
  const chartData = useMemo(() => {
    return moodData.map(entry => ({
      ...entry,
      displayDate: formatDate(entry.date)
    }));
  }, [moodData]);
  
  // Map moods to colors for the chart
  const getMoodColor = (mood: string) => {
    const moodColors: Record<string, string> = {
      anxious: '#3B82F6', // blue
      sad: '#6366F1',     // indigo
      angry: '#EF4444',   // red
      happy: '#10B981',   // green
      calm: '#14B8A6',    // teal
      tired: '#8B5CF6',   // purple
      neutral: '#9CA3AF'  // gray
    };
    
    return moodColors[mood] || '#9CA3AF';
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded text-xs">
          <p className="font-medium">{data.displayDate}</p>
          <p className="text-gray-600">Mood: {data.mood}</p>
          <p className="text-gray-600">Intensity: {data.intensity}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full h-64">
      {moodData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis 
              dataKey="displayDate" 
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
            />
            <YAxis 
              domain={[0, 10]} 
              tick={{ fontSize: 12 }}
              stroke="#9CA3AF"
              label={{ 
                value: 'Intensity', 
                angle: -90, 
                position: 'insideLeft',
                style: { fontSize: '12px' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#E07A5F"
              strokeWidth={2}
              dot={{ 
                stroke: '#E07A5F',
                strokeWidth: 2,
                r: 4,
                fill: 'white'
              }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">No mood data to display</p>
        </div>
      )}
    </div>
  );
};

export default MoodChart;
