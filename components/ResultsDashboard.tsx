import React from 'react';
import { AnalysisResult } from '../types';
import { PlayCircle, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import Markdown from 'markdown-to-jsx';

interface ResultsDashboardProps {
  data: AnalysisResult;
  youtubeUrl: string;
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <Markdown
      options={{
        overrides: {
          h1: { component: 'h3', props: { className: 'text-3xl font-bold text-white mt-8 mb-4' } },
          h2: { component: 'h4', props: { className: 'text-2xl font-bold text-white mt-7 mb-3' } },
          h3: { component: 'h5', props: { className: 'text-xl font-bold text-white mt-6 mb-3' } },
          p: { component: 'p', props: { className: 'text-xl text-gray-300 leading-relaxed mb-6 font-light' } },
          strong: { component: 'strong', props: { className: 'font-bold text-white' } },
          b: { component: 'strong', props: { className: 'font-bold text-white' } },
          em: { component: 'em', props: { className: 'italic text-gray-200' } },
          i: { component: 'em', props: { className: 'italic text-gray-200' } },
          ul: { component: 'ul', props: { className: 'list-disc list-outside ml-6 space-y-3 mb-8 text-xl text-gray-300 marker:text-red-500' } },
          ol: { component: 'ol', props: { className: 'list-decimal list-outside ml-6 space-y-3 mb-8 text-xl text-gray-300 marker:text-red-500' } },
          li: { component: 'li', props: { className: 'pl-2' } },
          blockquote: { component: 'blockquote', props: { className: 'border-l-4 border-gray-600 pl-6 italic text-xl text-gray-400 my-6' } },
          a: { component: 'a', props: { className: 'text-blue-400 hover:text-blue-300 underline decoration-blue-400/30' } },
          code: { component: 'code', props: { className: 'bg-gray-800 text-red-300 px-2 py-1 rounded text-base font-mono' } },
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ data, youtubeUrl }) => {
  
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      {/* 1. TITLE */}
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-tight">
          {data.title}
        </h1>
        
        {/* Video Link Card (Replaces Embed to avoid errors) */}
        <div className="max-w-4xl mx-auto">
          <a 
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
          >
            {/* Thumbnail Image */}
            <img 
              src={data.thumbnailUrl} 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-300"
            />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-6">
              <div className="p-6 bg-red-600 rounded-full shadow-lg shadow-red-600/20 group-hover:scale-110 group-hover:shadow-red-600/40 transition-all duration-300">
                <PlayCircle className="w-12 h-12 text-white fill-transparent" />
              </div>
              <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white group-hover:text-red-400 transition-colors text-center">
                <span>Click here to watch video on YouTube</span>
                <ExternalLink className="w-6 h-6" />
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* 2. SUMMARY */}
      <section>
        <div className="flex items-center gap-5 mb-8">
          <span className="w-2 h-10 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
          <h2 className="text-4xl font-bold text-white">Summary</h2>
        </div>
        
        <div className="bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl">
          <div className="mb-10">
             <MarkdownRenderer content={data.summary} />
          </div>

          {/* Key Points sub-section */}
          {data.keyPoints.length > 0 && (
            <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-red-400" />
                Key Takeaways
              </h3>
              <ul className="space-y-4">
                {data.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-xl text-gray-300 group">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 mt-3 group-hover:scale-150 transition-transform"></span>
                    <span className="group-hover:text-white transition-colors leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 3. TOPIC DISCUSSED */}
      <section>
        <div className="flex items-center gap-5 mb-8">
          <span className="w-2 h-10 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
          <h2 className="text-4xl font-bold text-white">Topic Discussed</h2>
        </div>

        <div className="bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl">
             <h3 className="text-xl font-medium text-gray-300 mb-8">Relevance Analysis</h3>
             
             {/* Chart Container */}
             <div className="h-[500px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.topics} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={200} 
                    tick={{ fill: '#d1d5db', fontSize: 18, fontWeight: 500 }}
                    interval={0}
                  />
                  <RechartsTooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#f3f4f6', fontSize: '16px' }}
                  />
                  <Bar dataKey="relevance" radius={[0, 6, 6, 0]} barSize={40}>
                     {data.topics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#3b82f6" fillOpacity={0.5 + (index * 0.1)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Topic Tags */}
            <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-gray-700/50">
              {data.topics.map((topic, i) => (
                <span key={i} className="px-6 py-3 rounded-full text-base font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  #{topic.name}
                </span>
              ))}
            </div>
        </div>
      </section>

      {/* 4. DETAILED ANALYSIS */}
      <section>
        <div className="flex items-center gap-5 mb-8">
          <span className="w-2 h-10 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
          <h2 className="text-4xl font-bold text-white">Detailed Analysis</h2>
        </div>

        <div className="bg-gray-800/40 border border-gray-700/50 backdrop-blur-sm rounded-3xl p-10 shadow-xl">
          <div className="mb-10">
            <MarkdownRenderer content={data.description} />
          </div>

          {/* Insights Sub-section */}
          {data.insights.length > 0 && (
             <div className="grid gap-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  Strategic Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.insights.map((insight, idx) => (
                    <div key={idx} className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                      <p className="text-gray-300 italic text-lg leading-relaxed">"{insight}"</p>
                    </div>
                  ))}
                </div>
             </div>
          )}
        </div>
      </section>

    </div>
  );
};