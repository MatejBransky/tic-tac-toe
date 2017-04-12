import { run } from 'runjs'

export const watch = () => {
  run('browser-sync start --server --files "."')
}