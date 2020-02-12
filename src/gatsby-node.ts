export function onSource({ reporter }:{ reporter: { info: (c: string) => void } }):void {
  reporter.info('gatsby-source-sylius onSource');
}

export function onPostBootstrap({ reporter }:{ reporter: { info: (c: string) => void } }):void {
  reporter.info('Gatsby source sylius onpostbootstrap');
}
