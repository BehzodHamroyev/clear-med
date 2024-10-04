import webpack from 'webpack';
import { buildCssLoader } from './loaders/buildCssLoader';
import { BuildOptions } from './types/config';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {

    
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/,
        use: [{
            loader: '@svgr/webpack',
            options: {
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ]
                }
            }
        }],
    };

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff|mov|mp4|mp3|wav)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    
    const cssLoader2 = {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
      

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // typescriptLoader,
        cssLoader,
        cssLoader2,
    ];
}
