package com.normal.mini.module.bpm.dal.mysql.definition;


import com.normal.mini.module.bpm.controller.admin.definition.vo.form.BpmFormPageReqVO;
import com.normal.mini.module.bpm.dal.dataobject.definition.BpmFormDO;
import com.normal.mini.framework.common.pojo.PageResult;
import com.normal.mini.framework.mybatis.core.mapper.BaseMapperX;
import com.normal.mini.framework.mybatis.core.query.QueryWrapperX;
import org.apache.ibatis.annotations.Mapper;

/**
 * 动态表单 Mapper
 *
 * @author 风里雾里
 */
@Mapper
public interface BpmFormMapper extends BaseMapperX<BpmFormDO> {

    default PageResult<BpmFormDO> selectPage(BpmFormPageReqVO reqVO) {
        return selectPage(reqVO, new QueryWrapperX<BpmFormDO>()
                .likeIfPresent("name", reqVO.getName())
                .orderByDesc("id"));
    }

}
