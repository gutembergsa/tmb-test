export const HOME_TABLE_HEADERS = {
    // ID: 'id',
    Cliente: 'cliente',
    Produto: 'produto',
    Valor: 'valor',
    Status: 'status',
    'Data Criação': 'createdAt',
}

export type Order = {
    id: string
    cliente: string
    produto: string
    valor: string
    status: string
    createdAt: string
}

export const INTL_DATE_FORMAT: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    // hour12: false, // Use 24-hour time
    // timeZone: 'UTC', // Ensure it's formatted as UTC
    // timeZoneName: 'short', // Add "UTC" or "GMT" suffix
}

//TYPES
export type TriangleAngle = { A: string; B: string; C: string }

export type VectorDistance = { A: string; B: string }

export type EXERCISES = {
    LEFT_SHOULDER_FLEXION?: number
    RIGHT_SHOULDER_FLEXION?: number
    LEFT_SHOULDER_ABDUCTION?: number
    RIGHT_SHOULDER_ABDUCTION?: number
    LEFT_SHOULDER_ROTATION?: number
    RIGHT_SHOULDER_ROTATION?: number
    LEFT_SHOULDER_EXTERNAL_ROTATION?: number
    RIGHT_SHOULDER_EXTERNAL_ROTATION?: number
    LEFT_LEG_STANDUP?: number
    RIGHT_LEG_STANDUP?: number
    LEFT_LEG_SITDOWN?: number
    RIGHT_LEG_SITDOWN?: number
    LEFT_LEG_FLEXION?: number
    RIGHT_LEG_FLEXION?: number
    LEFT_KNEE_EXTENSION?: number
    RIGHT_KNEE_EXTENSION?: number
    LEFT_HIP_ABDUCTION?: number
    RIGHT_HIP_ABDUCTION?: number
}

export type EXERCISES_NAMES = {
    LEFT_SHOULDER_FLEXION: string | keyof EXERCISES_NAMES
    RIGHT_SHOULDER_FLEXION: string | keyof EXERCISES_NAMES
    LEFT_SHOULDER_ABDUCTION: string | keyof EXERCISES_NAMES
    RIGHT_SHOULDER_ABDUCTION: string | keyof EXERCISES_NAMES
    LEFT_SHOULDER_ROTATION: string | keyof EXERCISES_NAMES
    RIGHT_SHOULDER_ROTATION: string | keyof EXERCISES_NAMES
    LEFT_SHOULDER_EXTERNAL_ROTATION: string | keyof EXERCISES_NAMES
    RIGHT_SHOULDER_EXTERNAL_ROTATION: string | keyof EXERCISES_NAMES
    LEFT_LEG_STANDUP: string | keyof EXERCISES_NAMES
    RIGHT_LEG_STANDUP: string | keyof EXERCISES_NAMES
    LEFT_LEG_SITDOWN: string | keyof EXERCISES_NAMES
    RIGHT_LEG_SITDOWN: string | keyof EXERCISES_NAMES
    LEFT_LEG_FLEXION: string | keyof EXERCISES_NAMES
    RIGHT_LEG_FLEXION: string | keyof EXERCISES_NAMES
    LEFT_KNEE_EXTENSION: string | keyof EXERCISES_NAMES
    RIGHT_KNEE_EXTENSION: string | keyof EXERCISES_NAMES
    LEFT_HIP_ABDUCTION: string | keyof EXERCISES_NAMES
    RIGHT_HIP_ABDUCTION: string | keyof EXERCISES_NAMES
}

export type Score = {
    attempt?: number
    score?: number
    angle?: number
    highest?: boolean
    exercise?: keyof EXERCISES_NAMES
    active?: boolean
    zeroMin?: boolean
}

export type EXECUTION_PROGRESS_DATA = {
    scores: Score[]
    completed: true
    active?: boolean
    executionOrder?: number
}

export type EXERCISE_PROGRESS = {
    [key in keyof EXERCISES_NAMES]?: EXECUTION_PROGRESS_DATA
}

export type ScoreAverages = { [key in keyof EXERCISES_NAMES]?: number }

//CONSTANTS
export const CONFIDENCE_THRESHOLD = 0.3
export const VIDEO_SCALE_COEFFICIENT = 3.7 // para o video de 640 X 480

export const EXERCISES = {
    LEFT_SHOULDER_FLEXION: 0,
    RIGHT_SHOULDER_FLEXION: 0,
    LEFT_SHOULDER_ABDUCTION: 0,
    RIGHT_SHOULDER_ABDUCTION: 0,
    LEFT_SHOULDER_ROTATION: 0,
    RIGHT_SHOULDER_ROTATION: 0,
    LEFT_SHOULDER_EXTERNAL_ROTATION: 0,
    RIGHT_SHOULDER_EXTERNAL_ROTATION: 0,
    LEFT_LEG_STANDUP: 0,
    RIGHT_LEG_STANDUP: 0,
    LEFT_LEG_SITDOWN: 0,
    RIGHT_LEG_SITDOWN: 0,
    LEFT_LEG_FLEXION: 0,
    RIGHT_LEG_FLEXION: 0,
    LEFT_KNEE_EXTENSION: 0,
    RIGHT_KNEE_EXTENSION: 0,
    LEFT_HIP_ABDUCTION: 0,
    RIGHT_HIP_ABDUCTION: 0,
}

export const EXERCISES_NAMES = {
    LEFT_SHOULDER_FLEXION: 'LEFT_SHOULDER_FLEXION',
    RIGHT_SHOULDER_FLEXION: 'RIGHT_SHOULDER_FLEXION',
    LEFT_SHOULDER_ABDUCTION: 'LEFT_SHOULDER_ABDUCTION',
    RIGHT_SHOULDER_ABDUCTION: 'RIGHT_SHOULDER_ABDUCTION',
    LEFT_SHOULDER_ROTATION: 'LEFT_SHOULDER_ROTATION',
    RIGHT_SHOULDER_ROTATION: 'RIGHT_SHOULDER_ROTATION',
    LEFT_SHOULDER_EXTERNAL_ROTATION: 'LEFT_SHOULDER_EXTERNAL_ROTATION',
    RIGHT_SHOULDER_EXTERNAL_ROTATION: 'RIGHT_SHOULDER_EXTERNAL_ROTATION',
    LEFT_LEG_STANDUP: 'LEFT_LEG_STANDUP',
    RIGHT_LEG_STANDUP: 'RIGHT_LEG_STANDUP',
    LEFT_LEG_SITDOWN: 'LEFT_LEG_SITDOWN',
    RIGHT_LEG_SITDOWN: 'RIGHT_LEG_SITDOWN',
    LEFT_LEG_FLEXION: 'LEFT_LEG_FLEXION',
    RIGHT_LEG_FLEXION: 'RIGHT_LEG_FLEXION',
    LEFT_KNEE_EXTENSION: 'LEFT_KNEE_EXTENSION',
    RIGHT_KNEE_EXTENSION: 'RIGHT_KNEE_EXTENSION',
    LEFT_HIP_ABDUCTION: 'LEFT_HIP_ABDUCTION',
    RIGHT_HIP_ABDUCTION: 'RIGHT_HIP_ABDUCTION',
}

export const ScoreAverages = {}

export const EXERCISES_ANGLES = {
    LEFT_SHOULDER_FLEXION: 180,
    RIGHT_SHOULDER_FLEXION: 180,
    LEFT_SHOULDER_ABDUCTION: 180,
    RIGHT_SHOULDER_ABDUCTION: 180,
    LEFT_SHOULDER_ROTATION: 90,
    RIGHT_SHOULDER_ROTATION: 90,
    LEFT_SHOULDER_EXTERNAL_ROTATION: 80,
    RIGHT_SHOULDER_EXTERNAL_ROTATION: 80,
    LEFT_LEG_STANDUP: 90,
    RIGHT_LEG_STANDUP: 90,
    LEFT_LEG_SITDOWN: 90,
    RIGHT_LEG_SITDOWN: 90,
    LEFT_LEG_FLEXION: 90,
    RIGHT_LEG_FLEXION: 90,
    LEFT_KNEE_EXTENSION: 90,
    RIGHT_KNEE_EXTENSION: 90,
    LEFT_HIP_ABDUCTION: 90,
    RIGHT_HIP_ABDUCTION: 90,
}

export const EXERCISES_ANGLES_EXPECTED_PERCENTAGE = {
    LEFT_SHOULDER_FLEXION: 50,
    RIGHT_SHOULDER_FLEXION: 50,
    LEFT_SHOULDER_ABDUCTION: 50,
    RIGHT_SHOULDER_ABDUCTION: 50,
    LEFT_SHOULDER_ROTATION: 50,
    RIGHT_SHOULDER_ROTATION: 50,
    LEFT_SHOULDER_EXTERNAL_ROTATION: 50,
    RIGHT_SHOULDER_EXTERNAL_ROTATION: 50,
    LEFT_LEG_STANDUP: 50,
    RIGHT_LEG_STANDUP: 50,
    LEFT_LEG_SITDOWN: 50,
    RIGHT_LEG_SITDOWN: 50,
    LEFT_LEG_FLEXION: 60,
    RIGHT_LEG_FLEXION: 60,
    LEFT_KNEE_EXTENSION: 50,
    RIGHT_KNEE_EXTENSION: 50,
    LEFT_HIP_ABDUCTION: 50,
    RIGHT_HIP_ABDUCTION: 50,
}

export const LEFT_SHOULDER_FLEXION: TriangleAngle = {
    A: 'left_wrist',
    B: 'left_shoulder',
    C: 'left_hip',
}

export const RIGHT_SHOULDER_FLEXION: TriangleAngle = {
    A: 'right_wrist',
    B: 'right_shoulder',
    C: 'right_hip',
}

export const LEFT_SHOULDER_ABDUCTION: TriangleAngle = {
    A: 'left_wrist',
    B: 'left_shoulder',
    C: 'left_hip',
}

export const RIGHT_SHOULDER_ABDUCTION: TriangleAngle = {
    A: 'right_wrist',
    B: 'right_shoulder',
    C: 'right_hip',
}

export const LEFT_SHOULDER_ROTATION: TriangleAngle = {
    A: 'left_wrist',
    B: 'left_shoulder',
    C: 'left_elbow',
}

export const RIGHT_SHOULDER_ROTATION: TriangleAngle = {
    A: 'right_wrist',
    B: 'right_shoulder',
    C: 'right_elbow',
}

export const LEFT_SHOULDER_ROTATION_LINE: VectorDistance = {
    A: 'left_wrist',
    B: 'left_elbow',
}

export const RIGHT_SHOULDER_ROTATION_LINE: VectorDistance = {
    A: 'right_elbow',
    B: 'right_wrist',
}

export const LEFT_LEG_STANDUP: TriangleAngle = {
    A: 'left_hip',
    B: 'left_knee',
    C: 'left_ankle',
}

export const RIGHT_LEG_STANDUP: TriangleAngle = {
    A: 'right_hip',
    B: 'right_knee',
    C: 'right_ankle',
}

export const LEFT_LEG_FLEXION: TriangleAngle = {
    A: 'left_hip',
    B: 'left_knee',
    C: 'left_ankle',
}

export const RIGHT_LEG_FLEXION: TriangleAngle = {
    A: 'right_hip',
    B: 'right_knee',
    C: 'right_ankle',
}

export const LEFT_KNEE_EXTENSION: TriangleAngle = {
    A: 'left_hip',
    B: 'left_knee',
    C: 'left_ankle',
}

export const RIGHT_KNEE_EXTENSION: TriangleAngle = {
    A: 'right_hip',
    B: 'right_knee',
    C: 'right_ankle',
}

export const LEFT_HIP_ABDUCTION: TriangleAngle = {
    A: 'right_ankle',
    B: 'right_knee',
    C: 'left_ankle',
}

export const RIGHT_HIP_ABDUCTION: TriangleAngle = {
    A: 'left_ankle',
    B: 'left_knee',
    C: 'right_ankle',
}

export const EXERCISES_MEMBERS_MAP = {
    LEFT_SHOULDER_FLEXION: LEFT_SHOULDER_FLEXION,
    RIGHT_SHOULDER_FLEXION: RIGHT_SHOULDER_FLEXION,
    LEFT_SHOULDER_ABDUCTION: LEFT_SHOULDER_ABDUCTION,
    RIGHT_SHOULDER_ABDUCTION: RIGHT_SHOULDER_ABDUCTION,
    LEFT_SHOULDER_ROTATION: LEFT_SHOULDER_ROTATION,
    RIGHT_SHOULDER_ROTATION: RIGHT_SHOULDER_ROTATION,
    LEFT_SHOULDER_EXTERNAL_ROTATION: LEFT_SHOULDER_ROTATION,
    RIGHT_SHOULDER_EXTERNAL_ROTATION: RIGHT_SHOULDER_ROTATION,
    LEFT_LEG_STANDUP: LEFT_LEG_STANDUP,
    RIGHT_LEG_STANDUP: RIGHT_LEG_STANDUP,
    LEFT_LEG_SITDOWN: LEFT_LEG_STANDUP,
    RIGHT_LEG_SITDOWN: RIGHT_LEG_STANDUP,
    LEFT_LEG_FLEXION: LEFT_LEG_FLEXION,
    RIGHT_LEG_FLEXION: RIGHT_LEG_FLEXION,
    LEFT_KNEE_EXTENSION: LEFT_KNEE_EXTENSION,
    RIGHT_KNEE_EXTENSION: RIGHT_KNEE_EXTENSION,
    LEFT_HIP_ABDUCTION: LEFT_HIP_ABDUCTION,
    RIGHT_HIP_ABDUCTION: RIGHT_HIP_ABDUCTION,
}

export const skeletonPoints = [
    ['left_shoulder', 'right_shoulder'],
    ['left_shoulder', 'left_elbow'],
    ['left_elbow', 'left_wrist'],
    ['right_shoulder', 'right_elbow'],
    ['right_elbow', 'right_wrist'],
    ['left_shoulder', 'left_hip'],
    ['right_shoulder', 'right_hip'],
    ['left_hip', 'right_hip'],
    ['left_hip', 'left_knee'],
    ['left_knee', 'left_ankle'],
    ['right_hip', 'right_knee'],
    ['right_knee', 'right_ankle'],
]

export const ATTEMPTS_MAP = {
    1: 'Primeira',
    2: 'Segunda',
    3: 'Terceira',
    4: 'Quarta',
    5: 'Quinta',
    6: 'Sexta',
    7: 'Sétima',
    8: 'Oitava',
    9: 'Nona',
    10: 'Décima',
}

export type EXECUTION_SETTING = {
    qtdSeries: number
    qtdRepeticoes: number
    isAuto: boolean
    isAutoTimeLimit: number
    isAutoTimeInterval: number
}

export type EXECUTION_PROGRESS = {
    started: boolean
    done: boolean
    interval: boolean
    currentSeries: number
    currentRepeticoes: number
}

export type ListItemType = {
    exerciseTitle: string
    exerciseDetail: string
    exerciseURL: string
    exerciseNames: string[]
    exerciseScore?: string
}

export const SHOULDER_EXERCISES: ListItemType[] = [
    {
        exerciseTitle: 'Flexão de Ombros',
        exerciseDetail: `Levante o braço à sua frente, como se estivesse tentando
        alcançar algo no alto. Vá até onde for confortável.
        Vamos avaliar o quanto seu ombro consegue se mover para
        frente e para cima.`,
        exerciseURL: '/exercise/1',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_SHOULDER_FLEXION,
            EXERCISES_NAMES.RIGHT_SHOULDER_FLEXION,
        ],
    },
    {
        exerciseTitle: 'Abdução de Ombro',
        exerciseDetail: `Levante o braço lateralmente, como se fosse fazer um
        “tchau” bem exagerado pro lado. Esse movimento mostra o
        quanto seu ombro se abre lateralmente.`,
        exerciseURL: '/exercise/2',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_SHOULDER_ABDUCTION,
            EXERCISES_NAMES.RIGHT_SHOULDER_ABDUCTION,
        ],
    },
    {
        exerciseTitle: 'Rotação Interna do Ombro',
        exerciseDetail: `Com o braço dobrado em 90 graus, gire-o para dentro, como se estivesse tentando encostar a mão no abdômen. Aqui, medimos a capacidade de rotação interna da articulação do ombro.`,
        exerciseURL: '/exercise/3',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_SHOULDER_ROTATION,
            EXERCISES_NAMES.RIGHT_SHOULDER_ROTATION,
        ],
    },
    {
        exerciseTitle: 'Rotação Externa do Ombro',
        exerciseDetail: `Agora, com o braço ainda dobrado em 90 graus, gire-o para fora, como se estivesse tentando apontar o dorso da mão para longe do corpo. Esse exercício avalia a abertura externa do seu ombro.`,
        exerciseURL: '/exercise/4',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_SHOULDER_EXTERNAL_ROTATION,
            EXERCISES_NAMES.RIGHT_SHOULDER_EXTERNAL_ROTATION,
        ],
    },
]

export const LEG_EXERCISES: ListItemType[] = [
    {
        exerciseTitle: 'Sentar/Levantar',
        exerciseDetail: `Em desenvolvimento.`,
        exerciseURL: '/exercise/5',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_LEG_STANDUP,
            EXERCISES_NAMES.RIGHT_LEG_STANDUP,
            EXERCISES_NAMES.LEFT_LEG_SITDOWN,
            EXERCISES_NAMES.RIGHT_LEG_SITDOWN,
        ],
    },
    {
        exerciseTitle: 'Flexão de quadril',
        exerciseDetail: `Em desenvolvimento.`,
        exerciseURL: '/exercise/6',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_LEG_FLEXION,
            EXERCISES_NAMES.RIGHT_LEG_FLEXION,
        ],
    },
    {
        exerciseTitle: 'Extensão de joelho',
        exerciseDetail: `Em desenvolvimento.`,
        exerciseURL: '/exercise/7',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_KNEE_EXTENSION,
            EXERCISES_NAMES.RIGHT_KNEE_EXTENSION,
        ],
    },
    {
        exerciseTitle: 'Abdução de quadril',
        exerciseDetail: `Em desenvolvimento.`,
        exerciseURL: '/exercise/8',
        exerciseNames: [
            EXERCISES_NAMES.LEFT_HIP_ABDUCTION,
            EXERCISES_NAMES.RIGHT_HIP_ABDUCTION,
        ],
    },
]

export const EXERCISES_GROUPS_NAME = { SHOULDER: 'SHOULDER', LEG: 'LEG' }
