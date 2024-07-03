'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import { useBoolean } from 'ahooks'
import cn from 'classnames'
import { Generator } from '@/app/components/base/icons/src/vender/other'
import GetAutomaticResModal from '@/app/components/app/configuration/config/automatic/get-automatic-res'
import { AppType } from '@/types/app'
import type { AutomaticRes } from '@/service/debug'
type Props = {
  className?: string
  onGenerated: (res: string) => void
}

const PromptGeneratorBtn: FC<Props> = ({
  className,
  onGenerated,
}) => {
  const [showAutomatic, { setTrue: showAutomaticTrue, setFalse: showAutomaticFalse }] = useBoolean(false)
  const handleAutomaticRes = useCallback((res: AutomaticRes) => {
    onGenerated(res.prompt)
    showAutomaticFalse()
  }, [onGenerated, showAutomaticFalse])
  return (
    <div className={cn(className)}>
      <div className='p-[5px] rounded-md hover:bg-[#155EEF]/8 cursor-pointer' onClick={showAutomaticTrue}>
        <Generator className='w-3.5 h-3.5 text-primary-600' />
      </div>
      {showAutomatic && (
        <GetAutomaticResModal
          mode={AppType.chat}
          isShow={showAutomatic}
          onClose={showAutomaticFalse}
          onFinished={handleAutomaticRes}
          isInLLMNode
        />
      )}
    </div>
  )
}

export default React.memo(PromptGeneratorBtn)
