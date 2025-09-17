import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadarChartData {
  category: string;
  score: number;
  fullMark: number;
}

interface RadarChartProps {
  data: RadarChartData[];
  title?: string;
  className?: string;
}

export const ProductRadarChart = ({ data, title, className = "" }: RadarChartProps) => {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center text-foreground">
          {title}
        </h3>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid 
              stroke="hsl(var(--border))" 
              strokeOpacity={0.3}
            />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ 
                fontSize: 12, 
                fill: "hsl(var(--foreground))",
                fontWeight: 500
              }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 10]} 
              tick={{ 
                fontSize: 10, 
                fill: "hsl(var(--muted-foreground))" 
              }}
              axisLine={false}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.2}
              strokeWidth={3}
              dot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
                r: 5
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Score Legend */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1 text-xs">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-muted-foreground">{item.category}:</span>
            <span className="font-semibold text-primary">{item.score}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
};