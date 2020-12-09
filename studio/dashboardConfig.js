export default {
  widgets: [
    {name: 'structure-menu'},
    {
      name: 'document-list',
      options: {title: 'Recently created projects', order: '_createdAt desc', types: ['project']},
      layout: {width: 'medium'}
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '',
                  title: 'Sanity Studio',
                  name: 'renate-thor-studio',
                  apiId: '6ea514a1-f194-4a2d-ba12-c55812d5c114'
                },
                {
                  buildHookId: '5fa344be95a27e41ba731be9',
                  title: 'Website',
                  name: 'renate-thor',
                  apiId: 'a32f5555-a97d-4e55-9fac-52f30fc1012f'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/elisejakob/renate-thor',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://renate-thor.netlify.app', category: 'apps'}
        ]
      }
    }
  ]
}
