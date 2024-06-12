import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} || Ema John`
    }, [title])
}

export default useTitle;