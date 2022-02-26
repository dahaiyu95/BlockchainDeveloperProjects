# Private Blockchain Application

## Test the project

### Task 1: GET http://localhost:8000/block/height/0

get results
{
    "hash": "c8c93ae594e2a8a511af8789136728c9e53ccba7dfc42142178fdd24ee1b9174",
    "height": 0,
    "body": "7b2264617461223a2247656e6573697320426c6f636b227d",
    "time": "1645854803",
    "previousBlockHash": null
}
### Task 2: POST http://localhost:8000/requestValidation

Use Bitcoin core to get address mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP
get the response "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP:1645854844:starRegistry"

### Task 3: SIGN Message using bitcoin core

    "address" : "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP",
    "message" : "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP:1645856186:starRegistry",

get    "signature" : "ICmDJZDPzaalL14dMN4Gsz00xuvEHThgkLU/zEtrH1ACPmZ8VTp0V2y5yJS6SYpRJg9xTFjblCI4ZpaL85zHnH0=",

### Task 4: submitStar http://localhost:8000/submitstar

submit 2 stars
First one
using input body 
{
    "address" : "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP",
    "signature" : "IN2p9UOna/HxlrbDucIE+gIrZyLInPRTHbYEZx1Bk/h6apycm8lWPhHcmUQjXJYk1FJJtcsLH4QCTiJJJiHZ09o=",
    "message" : "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP:1645858279:starRegistry",
        "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "Testing the star 1"
		}
}

get results
{
    "hash": "6f328208ad18644508c02a5ee5b8fe83ea6485b9f0a04139173a23dd725637aa",
    "height": 1,
    "body": "7b2277616c6c6574223a226d667a456d37584d7a3336647952465436726b58324b6a6b62685336566d38525150222c2273746172223a7b22646563223a223638c2b0203532272035362e39222c227261223a223136682032396d20312e3073222c2273746f7279223a2254657374696e672074686520737461722031227d7d",
    "time": "1645856248"
}

second one
{
    "address" : "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP",
    "signature" : "IN2p9UOna/HxlrbDucIE+gIrZyLInPRTHbYEZx1Bk/h6apycm8lWPhHcmUQjXJYk1FJJtcsLH4QCTiJJJiHZ09o=",
    "message" : "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP:1645858279:starRegistry",
        "star": {
            "dec": "88° 88' 88.98",
            "ra": "16h 29m 1.0s",
            "story": "Testing the star 4"
		}
}
{
    "hash": "0d4099a4bf76fddf0e63b128e64abec0c161aa16f72ea4e1505a5ac060fcbb9f",
    "height": 3,
    "body": "7b2261646472657373223a226d667a456d37584d7a3336647952465436726b58324b6a6b62685336566d38525150222c226d657373616765223a226d667a456d37584d7a3336647952465436726b58324b6a6b62685336566d385251503a313634353835383237393a737461725265676973747279222c227369676e6174757265223a22494e327039554f6e612f48786c726244756349452b6749725a794c496e505254486259455a7831426b2f6836617079636d386c57506848636d55516a584a596b31464a4a7463734c4834514354694a4a4a69485a30396f3d222c2273746172223a7b22646563223a223838c2b0203838272038382e3938222c227261223a223136682032396d20312e3073222c2273746f7279223a2254657374696e672074686520737461722034227d7d",
    "time": "1645858519"
}


### Task 5: getBlockByHash and getStarsByWalletAddress

http://localhost:8000/block/hash/0d4099a4bf76fddf0e63b128e64abec0c161aa16f72ea4e1505a5ac060fcbb9f

get results
{
    "hash": "0d4099a4bf76fddf0e63b128e64abec0c161aa16f72ea4e1505a5ac060fcbb9f",
    "height": 3,
    "body": "7b2261646472657373223a226d667a456d37584d7a3336647952465436726b58324b6a6b62685336566d38525150222c226d657373616765223a226d667a456d37584d7a3336647952465436726b58324b6a6b62685336566d385251503a313634353835383237393a737461725265676973747279222c227369676e6174757265223a22494e327039554f6e612f48786c726244756349452b6749725a794c496e505254486259455a7831426b2f6836617079636d386c57506848636d55516a584a596b31464a4a7463734c4834514354694a4a4a69485a30396f3d222c2273746172223a7b22646563223a223838c2b0203838272038382e3938222c227261223a223136682032396d20312e3073222c2273746f7279223a2254657374696e672074686520737461722034227d7d",
    "time": "1645858519"
}

http://localhost:8000/blocks/mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP
get results
[
    {
        "address": "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP",
        "message": "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP:1645858279:starRegistry",
        "signature": "IN2p9UOna/HxlrbDucIE+gIrZyLInPRTHbYEZx1Bk/h6apycm8lWPhHcmUQjXJYk1FJJtcsLH4QCTiJJJiHZ09o=",
        "star": {
            "dec": "68Â° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "Testing the star 3"
        }
    },
    {
        "address": "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP",
        "message": "mfzEm7XMz36dyRFT6rkX2KjkbhS6Vm8RQP:1645858279:starRegistry",
        "signature": "IN2p9UOna/HxlrbDucIE+gIrZyLInPRTHbYEZx1Bk/h6apycm8lWPhHcmUQjXJYk1FJJtcsLH4QCTiJJJiHZ09o=",
        "star": {
            "dec": "88Â° 88' 88.98",
            "ra": "16h 29m 1.0s",
            "story": "Testing the star 4"
        }
    }
]


