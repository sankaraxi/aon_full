import { WebContainer } from '@webcontainer/api';

async function startWebContainer() {
    const webcontainerInstance = await WebContainer.boot();
    await webcontainerInstance.mount({
        'src': {
            directory: {
                'index.js': {
                    file: {
                        contents: `
                            import React from 'react';
                            import ReactDOM from 'react-dom';
                            import App from './App';

                            ReactDOM.render(
                                <React.StrictMode>
                                    <App />
                                </React.StrictMode>,
                                document.getElementById('root')
                            );
                        `,
                    },
                },
                'App.js': {
                    file: {
                        contents: `
                            import React from 'react';
                            import MyComponent from './MyComponent';

                            function App() {
                                return (
                                    <div>
                                        <h1>Welcome to the React IDE</h1>
                                        <MyComponent />
                                    </div>
                                );
                            }

                            export default App;
                        `,
                    },
                },
                'MyComponent.js': {
                    file: {
                        contents: `
                            import React from 'react';

                            function MyComponent() {
                                return <p>This is a dynamically loaded component.</p>;
                            }

                            export default MyComponent;
                        `,
                    },
                },
            },
        },
        'public': {
            directory: {
                'index.html': {
                    file: {
                        contents: `
                            <!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>React App</title>
                            </head>
                            <body>
                                <div id="root"></div>
                            </body>
                            </html>
                        `,
                    },
                },
            },
        },
        'package.json': {
            file: {
                contents: JSON.stringify({
                    name: 'react-ide',
                    version: '1.0.0',
                    dependencies: {
                        react: '^18.0.0',
                        'react-dom': '^18.0.0',
                        'react-scripts': '5.0.1',
                    },
                    scripts: {
                        start: 'react-scripts start',
                    },
                }),
            },
        },
    });

    return webcontainerInstance;
}

async function executeReactApp(webContainer) {
    await webContainer.spawn('npm', ['install']); // Install dependencies
    const process = await webContainer.spawn('npm', ['start']); // Run React app

    process.output.pipeTo(
        new WritableStream({
            write(data) {
                console.log('Output:', data);
            }
        })
    );

    await process.exit;
}

export { startWebContainer, executeReactApp };
