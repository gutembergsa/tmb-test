import type { Keypoint, Pose } from '@tensorflow-models/pose-detection'
import {
    EXERCISES_NAMES,
    skeletonPoints,
    CONFIDENCE_THRESHOLD,
    EXERCISES_MEMBERS_MAP,
    type TriangleAngle,
    type VectorDistance,
} from './config'

//ANGLE FUNCTIONS
export const getAngle = (a: Keypoint, b: Keypoint, c: Keypoint) => {
    const ab = { x: a.x - b.x, y: a.y - b.y }
    const cb = { x: c.x - b.x, y: c.y - b.y }

    const dot = ab.x * cb.x + ab.y * cb.y
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2)
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2)

    const angleRad = Math.acos(dot / (magAB * magCB))
    return (angleRad * 180) / Math.PI
}

export const checkTriangleCoordinatesConfidence = (
    coordA: Keypoint,
    coordB: Keypoint,
    coordC: Keypoint
) => {
    return (
        coordA &&
        coordB &&
        coordC &&
        coordA.score! > CONFIDENCE_THRESHOLD &&
        coordB.score! > CONFIDENCE_THRESHOLD &&
        coordC.score! > CONFIDENCE_THRESHOLD
    )
}

export const checkVectorCoordinatesConfidence = (
    coordA: Keypoint,
    coordB: Keypoint,
    confidence?: number
) => {
    return (
        coordA &&
        coordB &&
        coordA.score! > (confidence ?? CONFIDENCE_THRESHOLD) &&
        coordB.score! > (confidence ?? CONFIDENCE_THRESHOLD)
    )
}

export const getAngleFromVector = (
    keypoints: Keypoint[],
    vector: VectorDistance,
    totalDistance: number,
    invertAngle: boolean = false,
    COEF = 180
) => {
    const coordA = keypoints.find((k) => k.name === vector.A)!
    const coordB = keypoints.find((k) => k.name === vector.B)!

    if (!checkVectorCoordinatesConfidence(coordA, coordB)) {
        return 0
    }

    const dx = coordB.x - coordA.x
    const dy = coordB.y - coordA.y

    let currentDistance = Math.sqrt(dx * dx + dy * dy)

    if (currentDistance > totalDistance) currentDistance = totalDistance
    if (currentDistance < 0) currentDistance = 0

    const cosTheta = currentDistance / totalDistance
    const angleRad = Math.acos(cosTheta)
    const angleValue = angleRad * (COEF / Math.PI)

    if (invertAngle === true) {
        const invertedAngle = COEF - angleValue
        if (angleValue && dx && dx < 0) {
            return Math.abs(invertedAngle - COEF)
        }

        return invertedAngle
    }

    if (angleValue && dx && dx < 0) {
        return Math.abs(angleValue - COEF)
    }

    return angleValue
}

export const getAngleFromMove = (
    keypoints: Keypoint[],
    triangleCoords: TriangleAngle,
    invertAngle: boolean = false
) => {
    let angle = 0

    const coordA = keypoints.find((k) => k.name === triangleCoords.A)!
    const coordB = keypoints.find((k) => k.name === triangleCoords.B)!
    const coordC = keypoints.find((k) => k.name === triangleCoords.C)!

    if (checkTriangleCoordinatesConfidence(coordA, coordB, coordC)) {
        angle = getAngle(coordA, coordB, coordC)

        if (invertAngle) {
            angle = 180 - angle
        }
    }

    return angle
}

export const getAngleScore = (angle: number, max = 90, min = 20) => {
    let score = 10
    if (angle <= min) {
        score = 10
    } else if (angle >= max) {
        score = 100
    } else {
        score = (angle * 100) / max
    }

    return Math.round((score * 100) / 100)
}

//CANVAS FUNCTIONS
const scalePoints = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    videoRef: React.RefObject<HTMLVideoElement>,
    keypoints: Keypoint[]
) => {
    const scaleX = canvasRef.current.width / videoRef.current.videoWidth
    const scaleY = canvasRef.current.height / videoRef.current.videoHeight

    const scaledKeypoints: Keypoint[] = keypoints.map((k) => ({
        ...k,
        x: k.x * scaleX,
        y: k.y * scaleY,
    }))

    return scaledKeypoints
}

export const canvasDesigner = (
    canvasRef: React.RefObject<HTMLCanvasElement>,
    videoRef: React.RefObject<HTMLVideoElement>,
    poses: Pose[],
    currentExercise: keyof EXERCISES_NAMES,
    drawCallback?: (keypoints: Keypoint[]) => void
) => {
    if (!canvasRef.current || !videoRef.current) return

    const ctx = canvasRef.current.getContext('2d')!
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    ctx.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
    )

    poses.forEach(({ keypoints }) => {
        const scaledKeypoints = scalePoints(canvasRef, videoRef, keypoints)

        drawCallback?.(scaledKeypoints)

        drawTriangle(
            ctx,
            scaledKeypoints,
            EXERCISES_MEMBERS_MAP[currentExercise]
        )
    })
}

export const drawSkeleton = (
    ctx: CanvasRenderingContext2D,
    keypoints: Keypoint[]
) => {
    const getKeypointByName = (name: string) =>
        keypoints.find((k) => k.name === name && k.score && k.score > 0.3)

    skeletonPoints.forEach(([partA, partB]) => {
        const kpA = getKeypointByName(partA)
        const kpB = getKeypointByName(partB)
        if (kpA && kpB) {
            ctx.beginPath()
            ctx.moveTo(kpA.x, kpA.y)
            ctx.lineTo(kpB.x, kpB.y)
            ctx.strokeStyle = 'lime'
            ctx.lineWidth = 2
            ctx.stroke()
        }
    })
}

export const drawTriangle = (
    ctx: CanvasRenderingContext2D,
    keypoints: Keypoint[],
    triangleCoords: TriangleAngle
) => {
    const coordA = keypoints.find((k) => k.name === triangleCoords.A)!
    const coordB = keypoints.find((k) => k.name === triangleCoords.B)!
    const coordC = keypoints.find((k) => k.name === triangleCoords.C)!

    if (!checkTriangleCoordinatesConfidence(coordA, coordB, coordC)) {
        return
    }

    ctx.beginPath()
    ctx.moveTo(coordA.x, coordA.y)
    ctx.lineTo(coordB.x, coordB.y)
    ctx.lineTo(coordC.x, coordC.y)
    ctx.closePath()

    ctx.fillStyle = 'rgba(21, 60, 42, 0.5)'
    ctx.fill()
    ctx.strokeStyle = 'rgba(58, 180, 92, 0.9)'
    ctx.stroke()
}

export const drawLine = (
    ctx: CanvasRenderingContext2D,
    keypoints: Keypoint[],
    vector: VectorDistance
) => {
    const coordA = keypoints.find((k) => k.name === vector.A)!
    const coordB = keypoints.find((k) => k.name === vector.B)!

    ctx.beginPath()
    ctx.moveTo(coordA.x, coordA.y)
    ctx.lineTo(coordB.x, coordB.y)
    ctx.closePath()

    ctx.strokeStyle = 'rgba(0, 0, 0)'
    ctx.stroke()
}

export const drawForearmLength = (
    ctx: CanvasRenderingContext2D,
    keypoints: Keypoint[],
    vector: VectorDistance
) => {
    const coordA = keypoints.find((k) => k.name === vector.A)!
    const coordB = keypoints.find((k) => k.name === vector.B)!

    ctx.beginPath()
    ctx.moveTo(coordA.x, coordA.y)
    ctx.lineTo(coordB.x, coordB.y)
    ctx.closePath()

    ctx.strokeStyle = 'rgba(0, 0, 0)'
    ctx.stroke()
}
