import { useState } from 'react'
import { IconSwap } from 'aios-ui-kit/icon-swap'
import { Button } from 'aios-ui-kit/button'
import { HeartFilledIcon, HeartIcon } from '../icons'

export default function IconSwapBasic() {
  const [liked, setLiked] = useState(false)

  return (
    <Button variant="ghost" onClick={() => setLiked((value) => !value)}>
      <IconSwap active={liked}>
        <HeartIcon className="size-5" />
        <HeartFilledIcon className="size-5" />
      </IconSwap>
    </Button>
  )
}
