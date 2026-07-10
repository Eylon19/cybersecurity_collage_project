function articleFormState(body) {
    return {
        title: body.title,
        category: body.category,
        author: body.author,
        summary: body.summary,
        content: body.content,
        difficulty_level: body.difficultyLevel,
        reading_time: body.readingTime,
        source_name: body.sourceName
    };
}

function threatFormState(body) {
    return {
        threat_name: body.threatName,
        description: body.description,
        severity: body.severity,
        target_audience: body.targetAudience,
        attack_method: body.attackMethod,
        warning_signs: body.warningSigns,
        prevention: body.prevention,
        damage_level: body.damageLevel
    };
}

function securityTipFormState(body) {
    return {
        title: body.title,
        category: body.category,
        description: body.description,
        importance_level: body.importanceLevel,
        recommended_action: body.recommendedAction,
        target_user: body.targetUser,
        example: body.example
    };
}

module.exports = {
    articleFormState,
    threatFormState,
    securityTipFormState
};
