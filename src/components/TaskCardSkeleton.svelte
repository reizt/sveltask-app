<style>
  ._skeleton {
    background: linear-gradient(110deg, theme('colors.accent') 8%, theme('colors.background') 22%, theme('colors.accent') 33%);
    background-size: 200% 100%;
    animation: 1.5s skeleton linear infinite;
  }

  @keyframes skeleton {
    0% {
      background-position-x: 100%;
    }
    30% {
      background-position-x: 0%;
    }
    30.01% {
      background-position-x: 200%;
    }
    60% {
      background-position-x: 100%;
    }
    100% {
      background-position-x: 100%;
    }
  }
</style>

<div class="_skeleton h-120 w-240 rounded-6" />
