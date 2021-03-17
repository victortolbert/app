<template>
  <PageWrapper>
    <section class="mt-4 px-8 max-w-3xl">🍝🍔🍟</section>
    <form @submit.prevent="" class="px-8 flex-col space-y-4">
      <OField label="Color">
        <input type="color" />
      </OField>
      <OField label="Date">
        <input type="date" />
      </OField>
      <OField label="Datetime Local">
        <input type="datetime-local" />
      </OField>
      <OField label="File">
        <input type="file" />
      </OField>
      <OField label="Hidden">
        <input type="hidden" />
      </OField>
      <OField label="Image">
        <input type="image" />
      </OField>
      <OField label="Month">
        <input type="month" />
      </OField>
      <OField label="Number">
        <input type="number" />
      </OField>
      <OField label="Range">
        <input type="range" />
      </OField>
      <OField label="Search">
        <input type="search" />
      </OField>
      <OField label="Tel">
        <input type="tel" />
      </OField>
      <OField label="Time">
        <input type="time" />
      </OField>
      <OField label="URL">
        <input type="url" />
      </OField>
      <OField label="Week">
        <input type="week" />
      </OField>
      <input type="reset" />
    </form>
    <section class="mt-4 px-8 max-w-3xl">
      <p class="content"><b>Selected:</b> {{ selectedAutocompleteOption }}</p>
      <OField label="Find a movie">
        <OAutocomplete
          :data="data"
          placeholder="e.g. Fight Club"
          field="title"
          :loading="isFetching"
          check-infinite-scroll
          :debounce-typing="500"
          @typing="getAsyncData"
          @select="option => (selectedAutocompleteOption = option)"
          @infinite-scroll="getMoreAsyncData"
        >
          <template slot-scope="props">
            <div class="media">
              <div class="media-left">
                <img
                  width="32"
                  :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`"
                />
              </div>
              <div class="media-content">
                {{ props.option.title }}
                <br />
                <small>
                  Released at {{ props.option.release_date }}, rated
                  <b>{{ props.option.vote_average }}</b>
                </small>
              </div>
            </div>
          </template>
          <template slot="footer">
            <span v-show="page > totalPages" class="has-text-grey">
              Thats it! No more movies found.
            </span>
          </template>
        </OAutocomplete>
      </OField>
    </section>
  </PageWrapper>
</template>
