export const state = () => ({
  name: 'UXLab',
  navbar: {
    links: [
      {
        label: 'Modules',
        path: 'modules',
        links: [
          {
            label: 'CodeIgniter',
            path: 'codeigniter',
          },
        ],
      },
      {
        label: 'Foundation',
        path: 'foundation',
        links: [
          {
            label: 'Color Palette',
            path: 'colors',
          },
        ],
      },
    ],
  },
})

export const mutations = {}
