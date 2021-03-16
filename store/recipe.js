import RecipeService from '~/services/RecipeService'

export const namespaced = true

export const state = () => ({
  recipes: [],
  recipesTotal: 0,
  recipe: {},
  perPage: 20,
})

export const getters = {
  getRecipeById: state => id => {
    return state.recipes.find(recipe => recipe.id === id)
  },
  getRecipesByTag: state => tag => {
    return state.recipes.filter(recipe => recipe.tags.includes(tag))
  },
  tags: state =>
    state.recipes
      .map(recipe => recipe.tags)
      .reduce((acc, val) => acc.concat(val), [])
      .reduce((obj, tag) => {
        if (!obj[tag]) {
          obj[tag] = 0
        }
        obj[tag]++
        return obj
      }, {}),
}

export const actions = {
  createRecipe({commit, dispatch}, recipe) {
    return RecipeService.postRecipe(recipe)
      .then(() => {
        commit('ADD_RECIPE', recipe)
        commit('SET_RECIPE', recipe)
        const notification = {
          type: 'success',
          recipe: 'Your recipe has been created!',
        }
        dispatch('notification/add', notification, {root: true})
      })
      .catch(error => {
        const notification = {
          type: 'error',
          recipe:
            'There was a problem creating your recipe: ' + error.recipe,
        }
        dispatch('notification/add', notification, {root: true})
        throw error
      })
  },
  fetchRecipes({commit, dispatch, state}, {page}) {
    return RecipeService.getRecipes(state.perPage, page)
      .then(response => {
        commit(
          'SET_RECIPES_TOTAL',
          parseInt(response.headers['x-total-count']),
        )
        commit('SET_RECIPES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          recipe: 'There was a problem fetching recipes: ' + error.recipe,
        }
        dispatch('notification/add', notification, {root: true})
      })
  },
  fetchRecipe({commit, getters, state}, id) {
    if (state.recipe.id === id) {
      return state.recipe
    }

    const recipe = getters.getRecipeById(id)

    if (recipe) {
      commit('SET_RECIPE', recipe)
      return recipe
    } else {
      return RecipeService.getRecipe(id).then(response => {
        commit('SET_RECIPE', response.data)
        return response.data
      })
    }
  },
}

export const mutations = {
  ADD_RECIPE(state, recipe) {
    state.recipes.push(recipe)
  },
  SET_RECIPES(state, recipes) {
    state.recipes = recipes
  },
  SET_RECIPES_TOTAL(state, recipesTotal) {
    state.recipesTotal = recipesTotal
  },
  SET_RECIPE(state, recipe) {
    state.recipe = recipe
  },
}
